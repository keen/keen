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

export type Line = {
  key: string;
  d: string;
  selector: (string | number)[];
  color: string;
  strokeWidth: number;
};

export type Mark = {
  key: string;
  radius: number;
  color: string;
  selector: (number | string)[];
  x: number;
  y: number;
};

export const groupMarksByPosition = (marks: Mark[]): Record<number, Mark[]> => {
  const groups: Record<number, Mark[]> = {};
  marks.forEach((mark: Mark) => {
    const { x } = mark;
    if (!groups[x]) groups[x] = [];
    groups[x].push(mark);
  });
  return groups;
};

export const findMarksInCluster = (
  mark: Mark,
  marks: Record<number, Mark[]>,
  range = 10
) => {
  const { x, y } = mark;
  const group = marks[x];
  return group.filter(mark => Math.abs(y - mark.y) < range);
};

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
  const marks: Mark[] = [];

  const [first] = data;

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

  const generateLineMarks = (keyName: string, lineIndex: number) => {
    const marks = [] as Mark[];
    data.forEach((_d: any, index: number) => {
      const value = data[index]?.[keyName];

      if (keyName !== labelSelector && value) {
        const mark = {
          key: `${index}.${keyName}.mark`,
          color: colors[lineIndex],
          selector: [index, keyName],
          x: xScale(new Date(data[index][labelSelector])),
          y: yScale(value),
          radius: markRadius,
        };

        marks.push(mark);
      }
    });
    return marks;
  };

  const lines = keys.map((keyName: string, idx: number) => {
    const calculateLine = lineShape()
      .x(function(d: Record<string, any>) {
        return xScale(new Date(d[labelSelector]));
      })
      .y(function(d: Record<string, any>) {
        return yScale(d[keyName]);
      });

    marks.push(...generateLineMarks(keyName, idx));

    return {
      key: keyName,
      selector: [idx, keyName],
      d: calculateLine(data),
      color: colors[idx],
      strokeWidth,
    };
  });

  return {
    marks,
    lines,
    xScale,
    yScale,
  };
};
