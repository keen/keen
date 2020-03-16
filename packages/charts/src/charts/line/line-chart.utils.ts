import { scaleLinear, scaleUtc, ScaleLinear, ScaleTime } from 'd3-scale';
import { line as lineShape, curveStep, curveMonotoneX, stack } from 'd3-shape';

import { getKeysDifference } from '../../utils/data.utils';
import { calculateScaleDomain } from '../../utils/scale.utils';

import { calculateRange, calculateStackedRange } from '../../utils/data.utils';

import { Options, Mark, Line, StepType, CurveType } from './types';

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
  return group.filter(mark => Math.abs(y - mark.y) < range);
};

export const calculateStackData = (
  data: any[],
  labelSelector: string,
  keys: string[]
): any[] => {
  const stackedData = stack().keys(keys)(data);

  const newData = stackedData.reduce((acc, value) => {
    const stackValues = value.map((el, idx) => {
      return {
        ...acc[idx],
        [labelSelector]: el.data[labelSelector],
        [value.key]: el[1],
      };
    });
    return [...stackValues];
  }, []);

  if (!keys.length) {
    return data.map(el => ({ labelSelector: el[labelSelector] }));
  }

  return newData;
};

const generateLineMarks = (
  data: any[],
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
        x: xScale(new Date(data[index][labelSelector])),
        y: yScale(value),
        radius: markRadius,
      };

      marks.push(mark);
    }
  });
  return marks;
};

const generateSteps = (
  data: Record<string, any>[],
  xScale: ScaleTime<number, number>,
  yScale: ScaleLinear<number, number>,
  labelSelector: string,
  keyName: string
) => {
  const steps: StepType[] = [];
  data.forEach((_d: any, index: number) => {
    const value = data[index]?.[keyName];
    const range = yScale.range();
    const width = 20;
    const lastTick = yScale.ticks()[yScale.ticks().length - 1];
    const x = xScale(new Date(data[index][labelSelector])) - width / 2;

    if (keyName !== labelSelector && value) {
      const step = {
        key: `${index}.${keyName}.step`,
        selector: [index, keyName],
        x,
        y: yScale(lastTick),
        height: range[0] - range[1],
        width,
        middle: x + width / x,
      };

      steps.push(step);
    }
  });

  return steps;
};

const calculateLine = (
  curve: CurveType,
  xScale: ScaleTime<number, number>,
  yScale: ScaleLinear<number, number>,
  labelSelector: string,
  keyName: string
) => {
  let lineShapeType;
  switch (curve) {
    case 'spline':
      lineShapeType = lineShape().curve(curveMonotoneX);
      break;

    case 'step':
      lineShapeType = lineShape().curve(curveStep);
      break;

    default:
      lineShapeType = lineShape();
      break;
  }

  return lineShapeType
    .x(function(d: Record<string, any>) {
      return xScale(new Date(d[labelSelector]));
    })
    .y(function(d: Record<string, any>) {
      return yScale(d[keyName]);
    });
};

export const generateGroupedLines = ({
  data,
  keys,
  disabledKeys,
  dimension,
  margins,
  minValue,
  maxValue,
  labelSelector,
  colors,
  markRadius,
  strokeWidth,
  curve,
}: Options) => {
  const stepMode = curve === 'step';
  const filteredKeys = disabledKeys
    ? getKeysDifference(keys, disabledKeys)
    : keys;

  const { minimum, maximum } = calculateRange(
    data,
    minValue,
    maxValue,
    filteredKeys
  );

  const marks: Mark[] = [];
  let steps: StepType[] = [];

  const [first] = data;

  const xScale = scaleUtc()
    .range([margins.left, dimension.width - margins.right])
    .domain([
      new Date(first[labelSelector]),
      new Date(data[data.length - 1][labelSelector]),
    ]);

  const yScale = scaleLinear()
    .range([dimension.height - margins.bottom, margins.top])
    .domain([minimum, maximum])
    .nice();

  calculateScaleDomain(yScale, minimum, maximum);

  const lines = [] as Line[];
  keys.forEach((keyName: string, idx: number) => {
    const generateLine = calculateLine(
      curve,
      xScale,
      yScale,
      labelSelector,
      keyName
    );

    if (disabledKeys && !disabledKeys.includes(keyName)) {
      if (stepMode && idx === 0)
        steps = generateSteps(data, xScale, yScale, labelSelector, keys[0]);
      marks.push(
        ...generateLineMarks(
          data,
          xScale,
          yScale,
          labelSelector,
          colors,
          keyName,
          idx,
          markRadius
        )
      );
      lines.push({
        key: keyName,
        selector: [idx, keyName],
        d: generateLine(data),
        color: colors[idx],
        strokeWidth,
      });
    }
  });

  return {
    stepMode,
    steps,
    marks,
    lines,
    xScale,
    yScale,
  };
};

export const generateStackLines = ({
  data,
  keys,
  disabledKeys,
  dimension,
  margins,
  minValue,
  maxValue,
  labelSelector,
  colors,
  markRadius,
  strokeWidth,
  curve,
}: Options) => {
  const stepMode = curve === 'step';
  const filteredKeys = disabledKeys
    ? getKeysDifference(keys, disabledKeys)
    : keys;

  const newData = calculateStackData(data, labelSelector, filteredKeys);

  const { minimum, maximum } = calculateStackedRange(
    data,
    minValue,
    maxValue,
    filteredKeys
  );

  const marks: Mark[] = [];
  const steps: StepType[] = [];

  const [first] = newData;

  const xScale = scaleUtc()
    .range([margins.left, dimension.width - margins.right])
    .domain([
      new Date(first[labelSelector]),
      new Date(newData[newData.length - 1][labelSelector]),
    ]);

  const yScale = scaleLinear()
    .range([dimension.height - margins.bottom, margins.top])
    .domain([minimum, maximum])
    .nice();

  calculateScaleDomain(yScale, minimum, maximum);

  const lines = [] as Line[];
  keys.forEach((keyName: string, idx: number) => {
    const generateLine = calculateLine(
      curve,
      xScale,
      yScale,
      labelSelector,
      keyName
    );

    if (disabledKeys && !disabledKeys.includes(keyName)) {
      if (idx === 0)
        steps.push(
          ...generateSteps(newData, xScale, yScale, labelSelector, keys[0])
        );
      marks.push(
        ...generateLineMarks(
          newData,
          xScale,
          yScale,
          labelSelector,
          colors,
          keyName,
          idx,
          markRadius
        )
      );
      lines.push({
        key: keyName,
        selector: [idx, keyName],
        d: generateLine(newData),
        color: colors[idx],
        strokeWidth,
      });
    }
  });

  return {
    stepMode,
    steps,
    marks,
    lines,
    xScale,
    yScale,
  };
};

export const generateLines = (options: Options) => {
  const { groupMode, stackMode } = options;

  return groupMode === 'grouped' && stackMode === 'normal'
    ? generateGroupedLines(options)
    : generateStackLines(options);
};
