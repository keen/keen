import { ScaleBand, ScaleLinear } from 'd3-scale';

import { Dimension, Margins } from '../types';

export enum AxisType {
  X = 'x',
  Y = 'y',
}

type Options = {
  scale: ScaleBand<string> | ScaleLinear<number, number>;
  dimension: Dimension;
  margins: Margins;
  axisType: AxisType;
};

export type GridLine = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export const getCenterPosition = (scale: ScaleBand<string>) => {
  const offset = scale.bandwidth() / 2;
  return (value: string) => scale(value) + offset;
};

const D3_AXIS_OFFSET = 0.5;

export const calculateVerticalLines = (
  { width, height }: Dimension,
  { top, bottom, left, right }: Margins
): GridLine[] => [
  {
    x1: left + D3_AXIS_OFFSET,
    x2: left + D3_AXIS_OFFSET,
    y2: height - bottom,
    y1: top,
  },
  {
    x1: width - right - D3_AXIS_OFFSET,
    x2: width - right - D3_AXIS_OFFSET,
    y2: height - bottom,
    y1: top,
  },
];

export const calculateHorizontalLines = (
  { width, height }: Dimension,
  { top, bottom, left, right }: Margins
): GridLine[] => [
  {
    x1: left,
    x2: width - right,
    y2: top + D3_AXIS_OFFSET,
    y1: top + D3_AXIS_OFFSET,
  },
  {
    x1: left,
    x2: width - right,
    y2: height - bottom - D3_AXIS_OFFSET,
    y1: height - bottom - D3_AXIS_OFFSET,
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
  let values: string[] | number[] = [];

  if ('bandwidth' in scale) {
    calculatePosition = getCenterPosition(scale);
    values = scale.domain();
    closeLines = true;
  } else {
    calculatePosition = scale;
    values = scale.ticks();
  }

  const lines: GridLine[] = [];

  if (axisType === AxisType.X) {
    values.forEach((value: string | number) => {
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
    values.forEach((value: string | number) => {
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
