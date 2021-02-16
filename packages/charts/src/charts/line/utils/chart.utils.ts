import { scaleLinear, scaleTime, scaleUtc } from 'd3-scale';
import {
  calculateRange,
  calculateStackedRange,
  calculateScaleDomain,
  getKeysDifference,
  transformToPercent,
  normalizeDate,
} from '@keen.io/charts-utils';

import {
  calculateStackData,
  calculateStackAreaData,
  sortKeys,
  calculateMaxMinSeriesValue,
} from './data.utils';
import { generateLineMarks } from './marks.utils';
import { generateSteps } from './steps.utils';
import { calculatePath } from './lines.utils';
import {
  generateSeriesBlockHeight,
  generateAreaGradient,
} from './gradient.utils';
import { calculateArea } from './area.utils';

import { GROUPED_GRADIENT, STACKED_GRADIENT } from '../constants';

import {
  Options,
  Mark,
  Line,
  StepType,
  AreaType,
  GradientBlockType,
  KeyNamesValuesType,
} from '../types';

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
  xScaleSettings,
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
  const steps: StepType[] = [];
  const areas: AreaType[] = [];
  const lines: Line[] = [];
  const gradientBlocks: GradientBlockType[] = [];

  const { useUTC, precision } = xScaleSettings;
  const dateNormalizer = (date: string) =>
    normalizeDate(date, precision, useUTC);

  const localizedData = data.map((item) => ({
    ...item,
    [labelSelector]: dateNormalizer(item[labelSelector]),
  }));

  const [first] = localizedData;
  const xScale = useUTC ? scaleUtc() : scaleTime();

  xScale
    .range([margins.left, dimension.width - margins.right])
    .domain([
      first[labelSelector],
      localizedData[localizedData.length - 1][labelSelector],
    ]);

  const yScale = scaleLinear()
    .range([dimension.height - margins.bottom, margins.top])
    .domain([minimum, maximum])
    .nice();

  calculateScaleDomain(yScale, minimum, maximum);

  let minMaxSeriesValues: KeyNamesValuesType = {};
  if (areaMode) {
    minMaxSeriesValues = calculateMaxMinSeriesValue(
      localizedData,
      labelSelector
    );
  }

  keys.forEach((keyName: string, idx: number) => {
    const generateLine = calculatePath(
      curve,
      xScale,
      yScale,
      labelSelector,
      keyName
    );

    if (disabledKeys && !disabledKeys.includes(keyName)) {
      if (idx === 0)
        steps.push(
          ...generateSteps(
            localizedData,
            xScale,
            yScale,
            labelSelector,
            keys[0]
          )
        );
      marks.push(
        ...generateLineMarks(
          localizedData,
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
        d: generateLine(localizedData),
        color: colors[idx],
        strokeWidth,
      });

      if (areaMode) {
        const {
          min: minKeyNameValue,
          max: maxKeyNameValue,
        } = minMaxSeriesValues[keyName];

        const isNegative = minimum < 0 && maximum <= 0;

        const generateArea = calculateArea(
          curve,
          xScale,
          yScale,
          labelSelector,
          keyName,
          minValue,
          maxValue,
          isNegative
        );

        gradientBlocks.push({
          x: margins.left,
          width: dimension.width - margins.right - margins.left,
          ...generateSeriesBlockHeight(
            minimum,
            maximum,
            yScale,
            minKeyNameValue,
            maxKeyNameValue,
            isNegative
          ),
        });

        areas.push({
          d: generateArea(localizedData),
          ...generateAreaGradient(
            minKeyNameValue,
            maxKeyNameValue,
            colors[idx],
            GROUPED_GRADIENT.min,
            GROUPED_GRADIENT.max
          ),
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
    localizedData,
    gradientBlocks,
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
  xScaleSettings,
}: Options) => {
  const stepMode = curve === 'step';
  const filteredKeys = disabledKeys
    ? getKeysDifference(keys, disabledKeys)
    : keys;

  const { useUTC, precision } = xScaleSettings;
  const dateNormalizer = (date: string) =>
    normalizeDate(date, precision, useUTC);

  const normalizeData = (groupMode === 'stacked' && stackMode === 'percent'
    ? transformToPercent(data, filteredKeys)
    : data
  ).map((item) => ({
    ...item,
    [labelSelector]: dateNormalizer(item[labelSelector]),
  }));

  const newData = calculateStackData(
    normalizeData,
    labelSelector,
    filteredKeys
  );

  const { minimum, maximum } = calculateStackedRange(
    normalizeData,
    minValue,
    maxValue,
    filteredKeys,
    stackMode === 'percent'
  );

  const marks: Mark[] = [];
  const steps: StepType[] = [];
  const areas: AreaType[] = [];
  const lines: Line[] = [];
  const gradientBlocks: GradientBlockType[] = [];

  const [first] = newData;

  const xScale = useUTC ? scaleUtc() : scaleTime();

  xScale
    .range([margins.left, dimension.width - margins.right])
    .domain([first[labelSelector], newData[newData.length - 1][labelSelector]]);

  const yScale = scaleLinear()
    .range([dimension.height - margins.bottom, margins.top])
    .domain([minimum, maximum])
    .nice();

  calculateScaleDomain(yScale, minimum, maximum);

  let minMaxSeriesValues: KeyNamesValuesType = {};
  let areaData: {
      firstDataPart: Record<string, any>[];
      secondDataPart: Record<string, any>[];
    },
    {} = {};
  if (areaMode) {
    areaData = calculateStackAreaData(
      normalizeData,
      labelSelector,
      filteredKeys
    );
    minMaxSeriesValues = calculateMaxMinSeriesValue(
      [...areaData.firstDataPart, ...areaData.secondDataPart],
      labelSelector
    );
  }
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
        const isNegative = minimum < 0 && maximum <= 0;

        const {
          min: minKeyNameValue,
          max: maxKeyNameValue,
        } = minMaxSeriesValues[keyName];

        gradientBlocks.push({
          x: margins.left,
          width: dimension.width - margins.right - margins.left,
          ...generateSeriesBlockHeight(
            minimum,
            maximum,
            yScale,
            minKeyNameValue,
            maxKeyNameValue,
            isNegative
          ),
        });

        areas.push({
          ...generateAreaGradient(
            minKeyNameValue,
            maxKeyNameValue,
            colors[idx],
            STACKED_GRADIENT.min,
            STACKED_GRADIENT.max
          ),
          d: `${generatePath(areaData.firstDataPart)} L${generatePath(
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
    gradientBlocks,
  };
};

export const generateLines = (options: Options) => {
  const { groupMode, stackMode, data, keys } = options;

  let newOptions = { ...options } as Options;
  const sortedKeys = sortKeys(data, keys);
  newOptions = { ...options, keys: sortedKeys };

  return groupMode === 'grouped' &&
    (stackMode === 'normal' || stackMode === 'percent')
    ? generateGroupedLines(newOptions)
    : generateStackLines(newOptions);
};
