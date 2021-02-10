import React, { useMemo, useRef, useEffect, useState } from 'react';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { formatScaleLabel, ScaleSettings } from '@keen.io/charts-utils';

import { Tick, Line } from '../elements';
import { Group } from './ruler.styles';

import RulerLabel from '../ruler-label';
import AxisTitle from '../axis-title.component';

import { generateRuler, rotateLabel } from './utils';

import { Axis, Tick as RulerTick, Orientation } from '../../types';

const TEXT_CENTER = '0.32em';

type Props = {
  /** Axis scale */
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  /** Ruler orientation */
  orientation: Orientation;
  /** X position */
  x: number;
  /** Y position */
  y: number;
  /** Maximum single label dimension */
  labelDimension?: number;
  /** Scale settings used to format labels */
  scaleSettings?: ScaleSettings;
  /** Data series title */
  axisTitle?: string;
} & Axis;

const Ruler = ({
  scale,
  x,
  y,
  tickPadding,
  orientation,
  tickSize,
  stroke,
  labels,
  title,
  color,
  scaleSettings,
  axisTitle,
  labelDimension,
}: Props) => {
  const groupElement = useRef(null);
  const [groupBox, setGroupBox] = useState<Partial<DOMRect>>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (groupElement.current) {
      const bbox = groupElement.current.getBBox();
      setGroupBox(bbox);
    }
  }, [groupElement, x, y, axisTitle]);

  const { enabled, typography, radiusAngle } = labels;

  const { line, ticks } = generateRuler({
    x,
    y,
    scale,
    scaleSettings,
    orientation,
    tickSize,
  });

  const { fontColor, ...rest } = typography;
  const textPosition = useMemo(
    () =>
      orientation === Orientation.HORIZONTAL
        ? {
            dy: tickPadding + tickSize,
            dx: 0,
          }
        : {
            dx: -Math.abs(tickPadding + tickSize),
            dy: TEXT_CENTER,
          },
    [orientation, tickPadding, tickSize]
  );

  const { anchor, radius, translateX, translateY } = rotateLabel(
    orientation,
    radiusAngle,
    tickPadding,
    tickSize
  );

  return (
    <>
      <Group
        color={fontColor}
        style={{ ...rest }}
        ref={groupElement}
        data-testid={`ruler-${orientation}`}
      >
        <Line {...line} color={color} stroke={stroke} />
        {ticks.map(({ x, y, size, text }: RulerTick, idx: number) => (
          <Tick
            key={idx}
            x={x}
            y={y}
            size={size}
            color={color}
            orientation={orientation}
          >
            {enabled && (
              <g
                textAnchor={anchor}
                transform={`translate(${translateX}, ${translateY}) rotate(${radius})`}
              >
                <RulerLabel
                  orientation={orientation}
                  maxDimension={labelDimension}
                  {...textPosition}
                >
                  {formatScaleLabel(text, scaleSettings)}
                </RulerLabel>
              </g>
            )}
          </Tick>
        ))}
      </Group>
      {axisTitle && (
        <AxisTitle
          titleSettings={title}
          orientation={orientation as Orientation}
          line={line}
          groupBox={groupBox}
        >
          {axisTitle}
        </AxisTitle>
      )}
    </>
  );
};

export default Ruler;
