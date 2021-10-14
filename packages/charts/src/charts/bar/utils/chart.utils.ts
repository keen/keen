import { scaleBand, scaleLinear } from 'd3-scale';
import { stack, stackOffsetDiverging } from 'd3-shape';

import { Layout, SortMode } from '@keen.io/ui-core';
import {
  calculateRange,
  calculateStackedRange,
  calculateScaleDomain,
  getKeysDifference,
  transformToPercent,
  normalizeDate,
  ScaleSettings,
  getOffsetRangeColor,
} from '@keen.io/charts-utils';

import { calculateGroupedBars } from './bar.utils';

import { Bar } from '../types';
import { Dimension, Margins, GroupMode, StackMode } from '../../../types';

type Options = {
  data: Record<string, any>[];
  keys: string[];
  disabledKeys: string[];
  labelSelector: string;
  dimension: Dimension;
  margins: Margins;
  layout: Layout;
  barPadding: number;
  groupMode: GroupMode;
  stackMode: StackMode;
  minValue?: number | 'auto';
  maxValue?: number | 'auto';
  colors: string[];
  xScaleSettings: ScaleSettings;
  yScaleSettings: ScaleSettings;
  xAxisTitle?: string;
  yAxisTitle?: string;
  barsOrder?: SortMode;
  dataSeriesOffset?: [number, number];
};

/**
 * Generate all data needed to set up grouped horizontal bar chart
 *
 * @param data - data series
 * @param keys - keys used in calculations
 * @param disabledKeys - keys disabled for calculation/display
 * @param dimension - predefine dimensions of the chart
 * @param margins - predefine margins of the chart
 * @param minValue - predefine minimum value
 * @param maxValue - predefine maximum value
 * @param barPadding - padding between bars
 * @param barsOrder - order of the bars
 * @param labelSelector - selected label from data
 * @param colors - palette of colors for chart
 * @param xScaleSettings - time scale settings
 * @param layout - layout of the plot
 * @return bars, xScale, yScale, localizedData
 *
 */

export const generateHorizontalGroupedBars = ({
  data,
  keys,
  disabledKeys,
  dimension,
  margins,
  minValue,
  maxValue,
  barPadding,
  barsOrder,
  labelSelector,
  colors,
  xScaleSettings,
  layout,
  dataSeriesOffset,
}: Options) => {
  const filteredKeys = getKeysDifference(keys, disabledKeys);
  const { precision } = xScaleSettings;

  const dateNormalizer = precision
    ? (date: string) => normalizeDate(date, precision)
    : null;

  const localizedData = dateNormalizer
    ? data.map((item) => ({
        ...item,
        [labelSelector]: dateNormalizer(item[labelSelector]),
      }))
    : data;

  const { minimum, maximum } = calculateRange(
    localizedData,
    minValue,
    maxValue,
    keys
  );

  const xScale = scaleLinear()
    .range([margins.left, dimension.width - margins.right])
    .domain([minimum, maximum]);

  calculateScaleDomain(xScale, minimum, maximum);

  const yScale = scaleBand()
    .range([dimension.height - margins.bottom, margins.top])
    .domain(localizedData.map((item: any) => item[labelSelector]).reverse())
    .padding(barPadding);

  const yGroupScale = scaleBand()
    .range([0, yScale.bandwidth()])
    .domain(filteredKeys);

  const range = new Array(yScale.domain().length).fill(true);

  const bars = calculateGroupedBars(
    localizedData,
    yGroupScale,
    keys,
    labelSelector,
    disabledKeys,
    range,
    xScale,
    yScale,
    layout,
    colors,
    barsOrder,
    dataSeriesOffset
  );

  return {
    bars,
    xScale,
    yScale,
    localizedData,
  };
};

/**
 * Generate all data needed to set up grouped vertical bar chart
 *
 * @param data - data series
 * @param dimension - predefine dimensions of the chart
 * @param margins - predefine margins of the chart
 * @param minValue - predefine minimum value
 * @param maxValue - predefine maximum value
 * @param barPadding - padding between bars
 * @param barsOrder - order of the bars
 * @param keys - keys used in calculations
 * @param disabledKeys - keys disabled for calculation/display
 * @param colors - palette of colors for chart
 * @param labelSelector - selected label from data
 * @param xScaleSettings - time scale settings
 * @param layout - layout of the plot
 * @return bars, xScale, yScale, localizedData
 *
 */

export const generateVerticalGroupedBars = ({
  data,
  dimension,
  margins,
  minValue,
  maxValue,
  barPadding,
  barsOrder,
  keys,
  disabledKeys,
  colors,
  labelSelector,
  xScaleSettings,
  layout,
  dataSeriesOffset,
}: Options) => {
  const filteredKeys = getKeysDifference(keys, disabledKeys);
  const { precision } = xScaleSettings;

  const dateNormalizer = precision
    ? (date: string) => normalizeDate(date, precision)
    : null;

  const localizedData = dateNormalizer
    ? data.map((item) => ({
        ...item,
        [labelSelector]: dateNormalizer(item[labelSelector]),
      }))
    : data;

  const { minimum, maximum } = calculateRange(
    localizedData,
    minValue,
    maxValue,
    keys
  );

  const xScale = scaleBand()
    .range([margins.left, dimension.width - margins.right])
    .domain(localizedData.map((item: any) => item[labelSelector]))
    .padding(barPadding);

  const yScale = scaleLinear()
    .range([dimension.height - margins.bottom, margins.top])
    .domain([minimum, maximum]);

  calculateScaleDomain(yScale, minimum, maximum);

  const xGroupScale = scaleBand()
    .range([0, xScale.bandwidth()])
    .domain(filteredKeys);

  const range = new Array(xScale.domain().length).fill(true);

  const bars = calculateGroupedBars(
    localizedData,
    xGroupScale,
    keys,
    labelSelector,
    disabledKeys,
    range,
    xScale,
    yScale,
    layout,
    colors,
    barsOrder,
    dataSeriesOffset
  );

  return {
    bars,
    xScale,
    yScale,
    localizedData,
  };
};

/**
 * Generate all data needed to set up stacked horizontal bar chart
 *
 * @param data - data series
 * @param dimension - predefine dimensions of the chart
 * @param margins - predefine margins of the chart
 * @param minValue - predefine minimum value
 * @param maxValue - predefine maximum value
 * @param barPadding - padding between bars
 * @param keys - keys used in calculations
 * @param disabledKeys - keys disabled for calculation/display
 * @param colors - palette of colors for chart
 * @param stackMode - stackMode option
 * @param labelSelector - selected label from data
 * @param xScaleSettings - time scale settings
 * @return bars, xScale, yScale, localizedData
 *
 */

export const generateHorizontalStackedBars = ({
  data,
  dimension,
  margins,
  minValue,
  maxValue,
  barPadding,
  keys,
  disabledKeys,
  colors,
  stackMode,
  labelSelector,
  xScaleSettings,
  dataSeriesOffset,
}: Options) => {
  const bars = [] as Bar[];
  const filteredKeys = getKeysDifference(keys, disabledKeys);
  const { precision } = xScaleSettings;

  const dateNormalizer = precision
    ? (date: string) => normalizeDate(date, precision)
    : null;

  const localizedData = dateNormalizer
    ? data.map((item) => ({
        ...item,
        [labelSelector]: dateNormalizer(item[labelSelector]),
      }))
    : data;

  const normalizedData =
    stackMode === 'normal'
      ? localizedData
      : transformToPercent(localizedData, filteredKeys);

  const stackedData = stack().keys(filteredKeys).offset(stackOffsetDiverging)(
    normalizedData
  );

  let { minimum, maximum } = calculateStackedRange(
    normalizedData,
    minValue,
    maxValue,
    filteredKeys
  );

  const percentMin = minimum < -100 ? -100 : minimum;
  const percentMax = maximum > 100 ? 100 : maximum;

  minimum = stackMode === 'percent' ? percentMin : minimum;
  maximum = stackMode === 'percent' ? percentMax : maximum;

  const xScale = scaleLinear()
    .range([margins.left, dimension.width - margins.right])
    .domain([minimum, maximum]);

  const yScale = scaleBand()
    .range([dimension.height - margins.bottom, margins.top])
    .domain(normalizedData.map((item: any) => item[labelSelector]).reverse())
    .padding(barPadding);

  calculateScaleDomain(xScale, minimum, maximum);

  const barHeight = yScale.bandwidth();
  const range = new Array(yScale.domain().length).fill(true);

  stackedData.forEach((item: any) => {
    const keyName = item.key;

    range.forEach((_d, index: number) => {
      const [rangeMin, rangeMax] = item[index];
      const width = xScale(rangeMax) - xScale(rangeMin) || 0;

      const bar = {
        key: `${index}.${keyName}`,
        selector: [index, keyName],
        x: xScale(rangeMin),
        y: yScale(normalizedData[index][labelSelector]),
        width,
        height: barHeight,
        color: getOffsetRangeColor(
          keys.indexOf(keyName),
          colors,
          dataSeriesOffset
        ),
        colorOutOfRange: dataSeriesOffset
          ? index < dataSeriesOffset[0] || index >= dataSeriesOffset[1]
          : !colors[index],
        value: data[index][keyName],
      };

      bars.push(bar);
    });
  });

  return {
    bars,
    xScale,
    yScale,
    localizedData,
  };
};

/**
 * Generate all data needed to set up stacked vertical bar chart
 *
 * @param data - data series
 * @param dimension - predefine dimensions of the chart
 * @param margins - predefine margins of the chart
 * @param minValue - predefine minimum value
 * @param maxValue - predefine maximum value
 * @param barPadding - padding between bars
 * @param keys - keys used in calculations
 * @param disabledKeys - keys disabled for calculation/display
 * @param colors - palette of colors for chart
 * @param stackMode - stackMode option
 * @param labelSelector - selected label from data
 * @param xScaleSettings - time scale settings
 * @return bars, xScale, yScale, localizedData
 *
 */

export const generateVerticalStackedBars = ({
  data,
  dimension,
  margins,
  minValue,
  maxValue,
  barPadding,
  keys,
  disabledKeys,
  colors,
  stackMode,
  labelSelector,
  xScaleSettings,
  dataSeriesOffset,
}: Options) => {
  const bars = [] as Bar[];
  const filteredKeys = getKeysDifference(keys, disabledKeys);
  const { precision } = xScaleSettings;

  const dateNormalizer = precision
    ? (date: string) => normalizeDate(date, precision)
    : null;

  const localizedData = dateNormalizer
    ? data.map((item) => ({
        ...item,
        [labelSelector]: dateNormalizer(item[labelSelector]),
      }))
    : data;

  const normalizedData =
    stackMode === 'normal'
      ? localizedData
      : transformToPercent(localizedData, filteredKeys);

  const stackedData = stack().keys(filteredKeys).offset(stackOffsetDiverging)(
    normalizedData
  );

  let { minimum, maximum } = calculateStackedRange(
    normalizedData,
    minValue,
    maxValue,
    filteredKeys
  );

  const percentMin = minimum < -100 ? -100 : minimum;
  const percentMax = maximum > 100 ? 100 : maximum;

  minimum = stackMode === 'percent' ? percentMin : minimum;
  maximum = stackMode === 'percent' ? percentMax : maximum;

  const xScale = scaleBand()
    .range([margins.left, dimension.width - margins.right])
    .domain(normalizedData.map((item: any) => item[labelSelector]))
    .padding(barPadding);

  const yScale = scaleLinear()
    .range([dimension.height - margins.bottom, margins.top])
    .domain([minimum, maximum]);

  calculateScaleDomain(yScale, minimum, maximum);

  const barWidth = xScale.bandwidth();
  const range = new Array(xScale.domain().length).fill(true);

  stackedData.forEach((item: any) => {
    const keyName = item.key;

    range.forEach((_d, index: number) => {
      const [rangeMin, rangeMax] = item[index];
      const height = yScale(rangeMin) - yScale(rangeMax) || 0;

      const bar = {
        key: `${index}.${keyName}`,
        selector: [index, keyName],
        x: xScale(normalizedData[index][labelSelector]),
        y: yScale(rangeMax),
        width: barWidth,
        height,
        color: getOffsetRangeColor(
          keys.indexOf(keyName),
          colors,
          dataSeriesOffset
        ),
        colorOutOfRange: dataSeriesOffset
          ? index < dataSeriesOffset[0] || index >= dataSeriesOffset[1]
          : !colors[index],
        value: data[index][keyName],
      };

      bars.push(bar);
    });
  });

  return {
    bars,
    xScale,
    yScale,
    localizedData,
  };
};

const BAR_RENDER_MAP: Record<string, any> = {
  grouped: {
    vertical: generateVerticalGroupedBars,
    horizontal: generateHorizontalGroupedBars,
  },
  stacked: {
    vertical: generateVerticalStackedBars,
    horizontal: generateHorizontalStackedBars,
  },
};

/**
 * Prepare options and check whitch function will be used based on layout and groupMode
 *
 * @param options - all options used in function generateVerticalGroupedBars or/and
 * generateHorizontalGroupedBars or/and generateVerticalStackedBars or/and
 * generateHorizontalStackedBars
 * @return function to use for generating bar chart data
 *
 */

export const generateBars = (options: Options) => {
  const {
    layout,
    groupMode,
    xScaleSettings,
    yScaleSettings,
    xAxisTitle,
    yAxisTitle,
  } = options;

  const settings =
    layout === 'vertical'
      ? {
          xScaleSettings,
          yScaleSettings,
          xAxisTitle,
          yAxisTitle,
        }
      : {
          xScaleSettings: yScaleSettings,
          yScaleSettings: xScaleSettings,
          xAxisTitle: yAxisTitle,
          yAxisTitle: xAxisTitle,
        };

  return {
    settings,
    ...BAR_RENDER_MAP[groupMode][layout].call(null, options),
  };
};
