import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { ScaleSettings } from '@keen.io/charts-utils';

import generateTicks from '../generate-ticks';

import { Orientation } from '../../../../types';

type Options = {
  x: number;
  y: number;
  tickSize: number;
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  orientation: Orientation;
  scaleSettings?: ScaleSettings;
};

export const generateRuler = ({
  x,
  y,
  tickSize,
  scale,
  orientation,
  scaleSettings,
}: Options) => {
  const [scaleStart, scaleEnd] = scale.range();
  const { ticks, ticksPrecision } = generateTicks({
    x,
    y,
    tickSize,
    scale,
    scaleSettings,
    orientation,
  });
  let line;

  if (orientation === Orientation.HORIZONTAL) {
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
    ticksPrecision,
  };
};

export default generateRuler;
