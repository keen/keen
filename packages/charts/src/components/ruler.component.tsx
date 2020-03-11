import React, { useMemo } from 'react';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';

import { Text, Tick, Line } from './elements';
import { Group } from './ruler.styles';

import { createRuler, rotateLabel } from './ruler.utils';

import { Axis, Tick as RulerTick, Orientation, ScaleSettings } from '../types';

const TEXT_CENTER = '0.32em';

type Props = {
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  orientation: Orientation;
  x: number;
  y: number;
  scaleSettings?: ScaleSettings;
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
  color,
  scaleSettings,
}: Props) => {
  const { enabled, typography, radiusAngle } = labels;
  const { line, ticks } = createRuler({
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
      orientation === Orientation.VERTICAL
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
    <Group color={fontColor} style={{ ...rest }}>
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
              <Text {...textPosition}>{text}</Text>
            </g>
          )}
        </Tick>
      ))}
    </Group>
  );
};

export default Ruler;
