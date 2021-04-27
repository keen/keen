import { scaleLinear, scaleUtc } from 'd3-scale';
import { v4 as uuid } from 'uuid';
import {
  calculateRange,
  calculateScaleDomain,
  getKeysDifference,
  transformToPercent,
  normalizeDate,
  sortKeysByValuesSum,
  getPaletteColor,
} from '@keen.io/charts-utils';
import calculateLineStackedRange from './calculate-line-stacked-range';

import {
  calculateStackData,
  calculateStackAreaData,
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

/**
 * Generate all data needed to set up grouped lines/area chart
 *
 * @param data - data series
 * @param keys - keys used in calculations
 * @param disabledKeys - keys disabled for calculation/display
 * @param dimension - predefine dimensions of the chart
 * @param margins - predefine margins of the chart
 * @param minValue - predefine minimum value
 * @param maxValue - predefine maximum value
 * @param labelSelector - selected label from data
 * @param colors - palette of colors for chart
 * @param markRadius - radius for marks
 * @param strokeWidth - stroke width for lines
 * @param curve - curve type connecting points
 * @param areaMode - if area path and gradient is needed
 * @param xScaleSettings - time scale settings
 * @return stepMode, steps, marks, lines, xScale, yScale, areas, localizedData, gradientBlocks,
 *
 */

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

  const { precision } = xScaleSettings;
  const dateNormalizer = (date: string) => normalizeDate(date, precision);

  const localizedData = data.map((item) => ({
    ...item,
    [labelSelector]: dateNormalizer(item[labelSelector]),
  }));

  const [first] = localizedData;
  const xScale = scaleUtc()
    .range([margins.left, dimension.width - margins.right])
    .domain([
      first[labelSelector],
      localizedData[localizedData.length - 1][labelSelector],
    ]);

  const yScale = scaleLinear()
    .range([dimension.height - margins.bottom, margins.top])
    .domain([minimum, maximum]);

  calculateScaleDomain(yScale, minimum, maximum);

  let minMaxSeriesValues: KeyNamesValuesType = {};
  if (areaMode) {
    minMaxSeriesValues = calculateMaxMinSeriesValue(
      localizedData,
      labelSelector
    );
  }

  keys.forEach((keyName: string, idx: number) => {
    const generateLine: (data: Record<string, any>[]) => string = calculatePath(
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
          getPaletteColor(idx, colors),
          keyName,
          markRadius
        )
      );
      lines.push({
        key: keyName,
        selector: [idx, keyName],
        d: generateLine(localizedData),
        color: getPaletteColor(idx, colors),
        strokeWidth,
      });

      if (areaMode) {
        const {
          min: minKeyNameValue,
          max: maxKeyNameValue,
        } = minMaxSeriesValues[keyName];

        const isNegativeSeries = minimum < 0 && maximum <= 0;

        const generateArea: (
          data: Record<string, any>[]
        ) => string = calculateArea(
          curve,
          xScale,
          yScale,
          labelSelector,
          keyName,
          minValue,
          maxValue,
          isNegativeSeries
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
            isNegativeSeries
          ),
        });

        areas.push({
          id: uuid(),
          d: generateArea(localizedData),
          ...generateAreaGradient(
            minKeyNameValue,
            maxKeyNameValue,
            getPaletteColor(idx, colors),
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

/**
 * Generate all data needed to set up stacked lines/area chart
 *
 * @param data - data series
 * @param keys - keys used in calculations
 * @param disabledKeys - keys disabled for calculation/display
 * @param dimension - predefine dimensions of the chart
 * @param margins - predefine margins of the chart
 * @param minValue - predefine minimum value
 * @param maxValue - predefine maximum value
 * @param labelSelector - selected label from data
 * @param colors - palette of colors for chart
 * @param markRadius - radius for marks
 * @param strokeWidth - stroke width for lines
 * @param curve - curve type connecting points
 * @param areaMode - if area path and gradient is needed
 * @param stackMode - stack mode settings
 * @param groupMode - group mode settings
 * @param xScaleSettings - time scale settings
 * @return stepMode, steps, marks, lines, xScale, yScale, areas, gradientBlocks,
 *
 */

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

  const { precision } = xScaleSettings;
  const dateNormalizer = (date: string) => normalizeDate(date, precision);

  const localizedData = data.map((item) => ({
    ...item,
    [labelSelector]: dateNormalizer(item[labelSelector]),
  }));

  const normalizeData =
    groupMode === 'stacked' && stackMode === 'percent'
      ? transformToPercent(localizedData, filteredKeys)
      : localizedData;

  const newData = calculateStackData(
    normalizeData,
    labelSelector,
    filteredKeys
  );

  let { minimum, maximum } = calculateLineStackedRange(
    normalizeData,
    minValue,
    maxValue,
    filteredKeys
  );

  const percentMin = minimum < -100 ? -100 : minimum;
  const percentMax = maximum > 100 ? 100 : maximum;

  minimum = stackMode === 'percent' ? percentMin : minimum;
  maximum = stackMode === 'percent' ? percentMax : maximum;

  const marks: Mark[] = [];
  const steps: StepType[] = [];
  const areas: AreaType[] = [];
  const lines: Line[] = [];
  const gradientBlocks: GradientBlockType[] = [];

  const [first] = newData;

  const xScale = scaleUtc()
    .range([margins.left, dimension.width - margins.right])
    .domain([first[labelSelector], newData[newData.length - 1][labelSelector]]);

  const yScale = scaleLinear()
    .range([dimension.height - margins.bottom, margins.top])
    .domain([minimum, maximum]);

  calculateScaleDomain(yScale, minimum, maximum);

  let minMaxSeriesValues: KeyNamesValuesType = {};
  let areaData: Record<string, any> = {};
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
          getPaletteColor(idx, colors),
          keyName,
          markRadius
        )
      );

      lines.push({
        key: keyName,
        selector: [idx, keyName],
        d: generatePath(newData),
        color: getPaletteColor(idx, colors),
        strokeWidth,
      });

      if (areaMode) {
        const isNegativeSeries = minimum < 0 && maximum <= 0;

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
            isNegativeSeries
          ),
        });

        areas.push({
          id: uuid(),
          ...generateAreaGradient(
            minKeyNameValue,
            maxKeyNameValue,
            getPaletteColor(idx, colors),
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
    localizedData,
  };
};

/**
 * Prepare options and check which function will be used based on groupMode and stackMode
 *
 * @param options - all options used in function generateGroupedLines or/and generateStackLines
 * @return function to use for generating line/area chart data
 *
 */

export const generateLines = (options: Options) => {
  const { groupMode, stackMode, data, keys } = options;

  let newOptions = { ...options } as Options;
  const sortedKeys = sortKeysByValuesSum(data, keys);
  newOptions = { ...options, keys: sortedKeys };

  return groupMode === 'grouped' &&
    (stackMode === 'normal' || stackMode === 'percent')
    ? generateGroupedLines(newOptions)
    : generateStackLines(newOptions);
};
