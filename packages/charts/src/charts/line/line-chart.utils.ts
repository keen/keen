import { scaleLinear, scaleUtc, ScaleLinear, ScaleTime } from 'd3-scale';
import {
  line as lineShape,
  curveStep,
  curveMonotoneX,
  stack,
  area,
} from 'd3-shape';

import { getKeysDifference, normalizeToPercent } from '../../utils/data.utils';
import { calculateScaleDomain } from '../../utils/scale.utils';

import { calculateRange, calculateStackedRange } from '../../utils/data.utils';

import { Options, Mark, Line, StepType, CurveType, AreaType } from './types';

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
  data: Record<string, any>[],
  labelSelector: string,
  keys: string[]
): any[] => {
  const stackedData = stack().keys(keys)(data);

  const newData = stackedData.reduce((acc, value) => {
    const stackValues = value.map((el, idx) => {
      const base = {
        ...acc[idx],
        [labelSelector]: el.data[labelSelector],
      };
      const first = {
        ...base,
        [value.key]: el[1],
      };
      return first;
    });

    return [...stackValues];
  }, []);

  if (!keys.length) {
    return data.map(el => ({ labelSelector: el[labelSelector] }));
  }

  return newData;
};

export const calculateStackAreaData = (
  data: Record<string, any>[],
  labelSelector: string,
  keys: string[]
): any => {
  const stackedData = stack().keys(keys)(data);

  const reduceStack = (id: number) => (acc: any[], value: any) => {
    const stackValues = value.map((el: any, idx: number) => {
      const base = {
        ...acc[idx],
        [labelSelector]: el.data[labelSelector],
      };
      const first = {
        ...base,
        [value.key]: el[id],
      };
      return first;
    });

    return [...stackValues];
  };

  const firstDataPart = stackedData.reduce(reduceStack(0), []);
  const secondDataPart = stackedData.reduce(reduceStack(1), []);

  if (!keys.length) {
    return data.map(el => ({ labelSelector: el[labelSelector] }));
  }

  return { firstDataPart, secondDataPart: secondDataPart.reverse() };
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

const calculatePath = (
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

const calculateNormalStackArea = (
  curve: CurveType,
  xScale: ScaleTime<number, number>,
  yScale: ScaleLinear<number, number>,
  labelSelector: string,
  keyName: string
) => {
  let lineShapeType;
  switch (curve) {
    case 'spline':
      lineShapeType = area().curve(curveMonotoneX);
      break;

    case 'step':
      lineShapeType = area().curve(curveStep);
      break;

    default:
      lineShapeType = area();
      break;
  }

  return lineShapeType
    .x(function(d: Record<string, any>) {
      return xScale(new Date(d[labelSelector]));
    })
    .y1(function(d: Record<string, any>) {
      return yScale(d[keyName]);
    })
    .y0(function() {
      return yScale(0);
    });
};

export const sortAreaKeys = (data: any[], keys: string[]) => {
  const sumKeys = data.reduce((acc, item) => {
    let idx = 0;
    for (const [key, value] of Object.entries(item).filter(a =>
      keys.includes(a[0])
    )) {
      if (acc[idx]) {
        acc[idx] = {
          ...acc[idx],
          value: acc[idx].value + value,
        };
      } else {
        acc[idx] = {
          key: key,
          value,
        };
      }
      idx++;
    }
    return acc;
  }, []);

  sumKeys.sort(
    (a: { key: string; value: number }, b: { key: string; value: number }) =>
      a.value < b.value ? 1 : -1
  );
  return sumKeys.map((item: { key: string; value: number }) => item.key);
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
  areaMode,
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

  const marks = [] as Mark[];
  const steps = [] as StepType[];
  const areas = [] as AreaType[];
  const lines = [] as Line[];

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

  keys.forEach((keyName: string, idx: number) => {
    const generateLine = calculatePath(
      curve,
      xScale,
      yScale,
      labelSelector,
      keyName
    );

    const generateArea = calculateNormalStackArea(
      curve,
      xScale,
      yScale,
      labelSelector,
      keyName
    );

    if (disabledKeys && !disabledKeys.includes(keyName)) {
      if (stepMode && idx === 0)
        steps.push(
          ...generateSteps(data, xScale, yScale, labelSelector, keys[0])
        );
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

      if (areaMode)
        areas.push({
          firstOpacity: 0.8,
          lastOpacity: 0.2,
          d: generateArea(data),
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
    areas,
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
  areaMode,
  stackMode,
  groupMode,
}: Options) => {
  const stepMode = curve === 'step';
  const filteredKeys = disabledKeys
    ? getKeysDifference(keys, disabledKeys)
    : keys;

  const normalizeData =
    groupMode === 'stacked' && stackMode === 'percent'
      ? normalizeToPercent(data, filteredKeys)
      : data;

  const newData = calculateStackData(
    normalizeData,
    labelSelector,
    filteredKeys
  );

  const { minimum, maximum } =
    groupMode === 'stacked' && stackMode === 'percent'
      ? { minimum: 0, maximum: 100 }
      : calculateStackedRange(normalizeData, minValue, maxValue, filteredKeys);

  const marks: Mark[] = [];
  const steps: StepType[] = [];
  const areas: AreaType[] = [];
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
    const generatePath = calculatePath(
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
        d: generatePath(newData),
        color: colors[idx],
        strokeWidth,
      });

      if (areaMode) {
        const areaData = calculateStackAreaData(
          normalizeData,
          labelSelector,
          filteredKeys
        );

        areas.push({
          firstOpacity: 0.7,
          lastOpacity: 0.3,
          d: `${generatePath(areaData.firstDataPart)},L${generatePath(
            areaData.secondDataPart
          ).substring(1)}`,
        });
      }
    }
  });

  return {
    stepMode,
    steps,
    marks,
    lines,
    xScale,
    yScale,
    areas,
  };
};

export const generateLines = (options: Options) => {
  const { groupMode, stackMode, areaMode, data, keys } = options;

  let newOptions = { ...options } as Options;
  if (areaMode) {
    const sortedKeys = sortAreaKeys(data, keys);
    newOptions = { ...options, keys: sortedKeys };
  }

  return groupMode === 'grouped' &&
    (stackMode === 'normal' || stackMode === 'percent')
    ? generateGroupedLines(newOptions)
    : generateStackLines(newOptions);
};
