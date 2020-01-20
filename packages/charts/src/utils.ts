import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { max, min } from 'd3-array';

import { Tick, Orientation } from './types';

const TICK_ALIGN = 0.5;

export const EDGE_TICK_ALIGN = 4;

export const getCenterPosition = (scale: ScaleBand<string>) => {
  const offset = scale.bandwidth() / 2;
  return (value: string) => scale(value) + offset;
};

export const calculateRange = (
  data: object[],
  minValue: number | 'auto',
  maxValue: number | 'auto',
  keys: string[]
) => {
  const values = data.reduce(
    (acc: number[], item: any) => [
      ...acc,
      ...keys.map((key: string) => item[key]).filter(v => v !== undefined),
    ],
    []
  ) as number[];

  let minimum = minValue === 'auto' ? min(values) : minValue;
  if (minimum > 0) {
    minimum = 0;
  }

  const maximum = maxValue === 'auto' ? max(values) : maxValue;

  return {
    minimum,
    maximum,
  };
};

export const calculateScaleDomain = (
  scale: ScaleLinear<number, number>,
  minimum: number,
  maximum: number
) => {
  const ticks = scale.ticks();
  const ticksLength = ticks.length;

  if (maximum > ticks[ticksLength - 1]) {
    const difference = Math.ceil(maximum / ticksLength);
    scale.domain([minimum, ticksLength * difference]);
  }
};

export const getScaleValues = (
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>
) => ('bandwidth' in scale ? scale.domain() : scale.ticks());

export const textFormat = (
  value: any,
  formatLabel?: (label: any) => string | number
): string | number => {
  if (formatLabel) return formatLabel(value);
  if (value instanceof Date) return value.toString();
  return value;
};

export const generateTicks = ({
  scale,
  tickSize,
  orientation = Orientation.VERTICAL,
  x,
  y,
  formatLabel,
}: {
  x: number;
  y: number;
  tickSize: number;
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  orientation?: Orientation;
  formatLabel?: (label: any) => string | number;
}): Tick[] => {
  const values = getScaleValues(scale);
  const ticks: Tick[] = [];
  const position = 'bandwidth' in scale ? getCenterPosition(scale) : scale;

  const getX = (value: string & { valueOf(): number }) =>
    orientation === Orientation.VERTICAL ? position(value) : x + TICK_ALIGN;

  const getY = (value: string & { valueOf(): number }) =>
    orientation === Orientation.VERTICAL ? y - TICK_ALIGN : position(value);

  values.forEach((value: any) => {
    ticks.push({
      size: tickSize,
      text: textFormat(value, formatLabel),
      x: getX(value),
      y: getY(value),
    });
  });

  if ('bandwidth' in scale) {
    const [scaleStart, scaleEnd] = scale.range();

    ticks.push(
      {
        size: tickSize + EDGE_TICK_ALIGN,
        x: orientation === Orientation.VERTICAL ? scaleStart : x + TICK_ALIGN,
        y: orientation === Orientation.VERTICAL ? y - TICK_ALIGN : scaleStart,
      },
      {
        size: tickSize + EDGE_TICK_ALIGN,
        x: orientation === Orientation.VERTICAL ? scaleEnd : x + TICK_ALIGN,
        y: orientation === Orientation.VERTICAL ? y - TICK_ALIGN : scaleEnd,
      }
    );
  }

  return ticks;
};
