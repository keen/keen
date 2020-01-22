import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';

import { getScaleValues, getCenterPosition } from '../utils';

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

export const generateGridLines = ({
  scale,
  dimension,
  margins,
  axisType,
}: Options) => {
  let closeLines = false;
  let calculatePosition: Function;
  const values = getScaleValues(scale);

  if ('bandwidth' in scale) {
    calculatePosition = getCenterPosition(scale);
    closeLines = true;
  } else {
    calculatePosition = scale;
  }

  const lines: Line[] = [];

  if (axisType === AxisType.X) {
    values.forEach((value: string | number | Date) => {
      const y1 = 0 + margins.top;
      const y2 = dimension.height - margins.bottom;
      const x = calculatePosition(value);

      lines.push({
        x1: x,
        y1,
        x2: x,
        y2,
      });
    });

    closeLines && lines.push(...calculateVerticalLines(dimension, margins));
  } else {
    values.forEach((value: string | number | Date) => {
      const y = calculatePosition(value);
      lines.push({
        x1: margins.left,
        y1: y,
        x2: dimension.width - margins.right,
        y2: y,
      });
    });

    closeLines && lines.push(...calculateHorizontalLines(dimension, margins));
  }

  return lines;
};
