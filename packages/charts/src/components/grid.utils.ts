import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import {
  getScaleTicks,
  getScaleCenterPosition,
  ScaleSettings,
} from '@keen.io/charts-utils';

import { Dimension, Margins, Line } from '../types';

export enum AxisType {
  X = 'x',
  Y = 'y',
}

type Options = {
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  dimension: Dimension;
  margins: Margins;
  axisType: AxisType;
  scaleSettings?: ScaleSettings;
};

const LINE_ADJUSTMENT = 0.5;

export const calculateVerticalLines = (
  { width, height }: Dimension,
  { top, bottom, left, right }: Margins
): Line[] => [
  {
    x1: left,
    x2: left,
    y2: height - bottom + LINE_ADJUSTMENT,
    y1: top - LINE_ADJUSTMENT,
  },
  {
    x1: width - right,
    x2: width - right,
    y2: height - bottom + LINE_ADJUSTMENT,
    y1: top - LINE_ADJUSTMENT,
  },
];

export const calculateHorizontalLines = (
  { width, height }: Dimension,
  { top, bottom, left, right }: Margins
): Line[] => [
  {
    x1: left - LINE_ADJUSTMENT,
    x2: width - right + LINE_ADJUSTMENT,
    y2: top,
    y1: top,
  },
  {
    x1: left - LINE_ADJUSTMENT,
    x2: width - right + LINE_ADJUSTMENT,
    y2: height - bottom,
    y1: height - bottom,
  },
];

type Center = (value: string) => number;
type CalculatePosition =
  | ScaleLinear<number, number>
  | ScaleTime<number, number>
  | Center;

export const generateGridLines = ({
  scale,
  scaleSettings,
  dimension,
  margins,
  axisType,
}: Options) => {
  let closeLines = false;
  let calculatePosition: CalculatePosition;
  const { ticks: values } = getScaleTicks(scale, scaleSettings);

  if ('bandwidth' in scale) {
    calculatePosition = getScaleCenterPosition(scale) as (
      value: string
    ) => number;
    closeLines = true;
  } else {
    calculatePosition = scale as
      | ScaleLinear<number, number>
      | ScaleTime<number, number>;
  }

  const lines: Line[] = [];

  if (axisType === AxisType.X) {
    values.forEach((value: any) => {
      const y1 = 0 + margins.top;
      const y2 = dimension.height - margins.bottom;
      const x = calculatePosition(value);
      const isZero = value === 0;

      lines.push({
        x1: x,
        y1,
        x2: x,
        y2,
        stroke: isZero ? 2 : undefined,
      });
    });

    closeLines && lines.push(...calculateVerticalLines(dimension, margins));
  } else {
    values.forEach((value: any) => {
      const y = calculatePosition(value);
      const isZero = value === 0;

      lines.push({
        x1: margins.left,
        y1: y,
        x2: dimension.width - margins.right,
        y2: y,
        stroke: isZero ? 2 : undefined,
      });
    });

    closeLines && lines.push(...calculateHorizontalLines(dimension, margins));
  }

  return lines;
};
