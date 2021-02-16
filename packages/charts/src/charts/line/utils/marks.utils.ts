import { ScaleLinear, ScaleTime } from 'd3-scale';
import { Mark, Line, StepType } from '../types';

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
  mark: Mark | StepType,
  marks: Record<number, Mark[]>,
  range = 10
) => {
  const { x, y } = mark;
  const group = marks[x];
  return group.filter((mark) => Math.abs(y - mark.y) < range);
};

export const showAllMarks = (
  stepMode: boolean,
  marks: Mark[],
  lines: Line[]
) => {
  if (marks.length && lines.length)
    return stepMode || marks[0].radius <= lines[0].strokeWidth / 2;
  return false;
};

export const generateLineMarks = (
  data: Record<string, any>[],
  xScale: ScaleTime<number, number>,
  yScale: ScaleLinear<number, number>,
  labelSelector: string,
  colors: string[],
  keyName: string,
  lineIndex: number,
  markRadius: number
) => {
  const marks = [] as Mark[];
  data.forEach((_d: any, index: number) => {
    const value = data[index]?.[keyName];

    if (keyName !== labelSelector && value) {
      const mark = {
        key: `${index}.${keyName}.mark`,
        color: colors[lineIndex],
        selector: [index, keyName],
        x: xScale(data[index][labelSelector]),
        y: yScale(value),
        radius: markRadius,
      };

      marks.push(mark);
    }
  });
  return marks;
};
