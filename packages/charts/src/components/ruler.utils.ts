import { ScaleBand, ScaleLinear } from 'd3-scale';

import { generateTicks } from '../utils';

import { Orientation } from '../types';

type Options = {
  x: number;
  y: number;
  tickSize: number;
  scale: ScaleBand<string> | ScaleLinear<number, number>;
  orientation: Orientation;
};

export const createRuler = ({
  x,
  y,
  tickSize,
  scale,
  orientation,
}: Options) => {
  const [scaleStart, scaleEnd] = scale.range();
  const ticks = generateTicks({ x, y, tickSize, scale, orientation });
  let line;

  if (orientation === Orientation.VERTICAL) {
    line = {
      x1: scaleStart,
      x2: scaleEnd,
      y1: y,
      y2: y,
    };
  } else {
    line = {
      x1: x,
      x2: x,
      y1: scaleStart,
      y2: scaleEnd,
    };
  }

  return {
    line,
    ticks,
  };
};
