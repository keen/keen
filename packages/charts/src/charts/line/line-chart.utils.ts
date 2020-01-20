import { scaleLinear, scaleUtc } from 'd3-scale';
import { line as lineShape } from 'd3-shape';
import { calculateRange, calculateScaleDomain } from '../../utils';
import { Dimension, Margins } from '../../types';

type Options = {
  data: any[];
  keys: string[];
  labelSelector: string;
  dimension: Dimension;
  margins: Margins;
  minValue?: number | 'auto';
  maxValue?: number | 'auto';
  colors: string[];
  markRadius: number;
  strokeWidth: number;
};

export type Lines = {
  key: string;
  line: Line;
  marks: Mark[];
  color: string;
  markRadius: number;
  strokeWidth: number;
};

export type Line = {
  key: string;
  d: string;
};

export type Mark = {
  key: string;
  x: number;
  y: number;
};

export const sortDates = (data: any[], labelSelector: string) =>
  data.length &&
  data.sort(
    (a, b) =>
      (new Date(a[labelSelector]) as any) - (new Date(b[labelSelector]) as any)
  );

export const generateLines = ({
  data,
  keys,
  dimension,
  margins,
  minValue,
  maxValue,
  labelSelector,
  colors,
  markRadius,
  strokeWidth,
}: Options) => {
  const { minimum, maximum } = calculateRange(data, minValue, maxValue, keys);

  const [first] = sortDates(data, labelSelector);

  const xScale = scaleUtc()
    .range([margins.left, dimension.width - margins.right])
    .domain([
      new Date(first[labelSelector]),
      new Date(data[data.length - 1][labelSelector]),
    ]);

  const yScale = scaleLinear()
    .range([dimension.height - margins.bottom, margins.top])
    .domain([minimum, maximum]);

  calculateScaleDomain(yScale, minimum, maximum);

  const generateLineMarks = (keyName: string) => {
    const marks = [] as Mark[];
    data.forEach((_d: any, index: number) => {
      const value = data[index]?.[keyName];

      if (keyName !== labelSelector && value) {
        const mark = {
          key: `${index}.${keyName}.mark`,
          x: xScale(new Date(data[index][labelSelector])),
          y: yScale(value),
        };
        marks.push(mark);
      }
    });
    return marks;
  };

  const lines = keys.map((keyName: string, idx: number) => {
    const calculateLine = lineShape()
      .x(function(d: any) {
        return xScale(new Date(d[labelSelector]));
      })
      .y(function(d: any) {
        return yScale(d[keyName]);
      });

    return {
      key: keyName,
      line: {
        key: `${idx}.${keyName}.line`,
        d: calculateLine(data),
      },
      marks: generateLineMarks(keyName),
      color: colors[idx],
      markRadius,
      strokeWidth,
    };
  });

  return {
    lines,
    xScale,
    yScale,
  };
};
