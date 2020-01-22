import React, { useMemo } from 'react';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';

import { Text, Tick, Line } from './elements';
import { Group } from './ruler.styles';

import { createRuler } from './ruler.utils';

import { Axis, Tick as RulerTick, Orientation } from '../types';

const TEXT_CENTER = '0.32em';

type Props = {
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  orientation: Orientation;
  x: number;
  y: number;
  formatLabel?: (label: string | number) => string | number;
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
  formatLabel,
}: Props) => {
  const { enabled, typography } = labels;
  const { line, ticks } = createRuler({
    x,
    y,
    scale,
    orientation,
    tickSize,
    formatLabel,
  });

  const textProps = useMemo(
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

  const { fontColor, ...rest } = typography;

  return (
    <Group
      color={color}
      textAnchor={orientation === Orientation.VERTICAL ? 'middle' : 'end'}
      style={{ ...rest, color: fontColor }}
    >
      <Line {...line} stroke={stroke} />
      {ticks.map(({ x, y, size, text }: RulerTick, idx: number) => (
        <Tick key={idx} x={x} y={y} size={size} orientation={orientation}>
          {enabled && <Text {...textProps}>{text}</Text>}
        </Tick>
      ))}
    </Group>
  );
};

export default Ruler;
