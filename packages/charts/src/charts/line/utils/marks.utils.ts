import { ScaleLinear, ScaleTime } from 'd3-scale';
import { Mark, Line, StepType } from '../types';

/**
 * Group marks based on x position.
 *
 * @param marks - all chart marks for grouping
 * @return a list of marks displayed on each xScale tick
 *
 */

export const groupMarksByPosition = (marks: Mark[]): Record<number, Mark[]> => {
  const groups: Record<number, Mark[]> = {};
  marks.forEach((mark: Mark) => {
    const { x } = mark;
    if (!groups[x]) groups[x] = [];
    groups[x].push(mark);
  });
  return groups;
};

/**
 * Find all marks in range from selected mark.
 *
 * @param mark - selected mark
 * @param marks - all chart marks
 * @param range - range used for finding near mark
 * @return a list of marks found within a range from selected mark
 *
 */

export const findMarksInCluster = (
  mark: Mark | StepType,
  marks: Record<number, Mark[]>,
  range = 10
) => {
  const { x, y } = mark;
  const group = marks[x];
  return group.filter((mark) => Math.abs(y - mark.y) < range);
};

/**
 * Check if marks should be visible based on stepMode,
 * mark radius and lines strokeWidth
 *
 * @param stepMode - step mode information
 * @param marks - all chart marks
 * @param lines - all chart lines
 * @return boolean if marks should be visible or not
 *
 */

export const showAllMarks = (
  stepMode: boolean,
  marks: Mark[],
  lines: Line[]
) => {
  if (marks.length && lines.length)
    return stepMode || marks[0].radius <= lines[0].strokeWidth / 2;
  return false;
};

/**
 * Generate marks for each series
 *
 * @param data - step mode information
 * @param xScale - time scale
 * @param yScale - linear scale
 * @param labelSelector - selected label from data
 * @param color - marks color
 * @param keyName - key of series
 * @param markRadius - marks radius
 * @return marks for serie
 *
 */

export const generateLineMarks = (
  data: Record<string, any>[],
  xScale: ScaleTime<number, number>,
  yScale: ScaleLinear<number, number>,
  labelSelector: string,
  color: string,
  keyName: string,
  markRadius: number
) => {
  const marks = [] as Mark[];
  data.forEach((_d: any, index: number) => {
    const value = data[index]?.[keyName];

    if (keyName !== labelSelector) {
      const mark = {
        key: `${index}.${keyName}.mark`,
        dataSerieKey: keyName,
        color,
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
