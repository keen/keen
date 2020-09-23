import { ScaleLinear, ScaleBand, ScaleTime, scaleOrdinal } from 'd3-scale';
import {
  ScaleSettings,
  formatScaleLabel,
  getScaleValues,
} from '@keen.io/charts-utils';

import { Tick, Orientation } from '../types';

const TICK_ALIGN = 0.5;

export const EDGE_TICK_ALIGN = 4;

export const getCenterPosition = (scale: ScaleBand<string>) => {
  const offset = scale.bandwidth() / 2;
  return (value: string) => scale(value) + offset;
};

export const generateTicks = ({
  scale,
  tickSize,
  orientation = Orientation.HORIZONTAL,
  scaleSettings,
  x,
  y,
}: {
  x: number;
  y: number;
  tickSize: number;
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  orientation?: Orientation;
  scaleSettings?: ScaleSettings;
}): Tick[] => {
  const values = getScaleValues(scale, scaleSettings);

  const ticks: Tick[] = [];
  const position = 'bandwidth' in scale ? getCenterPosition(scale) : scale;

  const getX = (value: string & { valueOf(): number }) =>
    orientation === Orientation.HORIZONTAL ? position(value) : x + TICK_ALIGN;

  const getY = (value: string & { valueOf(): number }) =>
    orientation === Orientation.HORIZONTAL ? y - TICK_ALIGN : position(value);

  values.forEach((value: any) => {
    ticks.push({
      size: tickSize,
      text: formatScaleLabel(value, scaleSettings),
      x: getX(value),
      y: getY(value),
    });
  });

  if ('bandwidth' in scale && orientation === Orientation.HORIZONTAL) {
    const [scaleStart, scaleEnd] = scale.range();

    ticks.push(
      {
        size: tickSize + EDGE_TICK_ALIGN,
        x: scaleStart,
        y: y - TICK_ALIGN,
      },
      {
        size: tickSize + EDGE_TICK_ALIGN,
        x: scaleEnd,
        y: y - TICK_ALIGN,
      }
    );
  }

  return ticks;
};

export const bubbleColorScale = (colors: string[]) => scaleOrdinal(colors);
