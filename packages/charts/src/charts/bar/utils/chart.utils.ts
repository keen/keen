import { scaleBand, scaleLinear } from 'd3-scale';
import { stack, stackOffsetDiverging } from 'd3-shape';
import { colors as colorPalette } from '@keen.io/colors';

import { Layout, SortMode } from '@keen.io/ui-core';
import {
  calculateRange,
  calculateStackedRange,
  calculateScaleDomain,
  getKeysDifference,
  transformToPercent,
  normalizeDate,
  ScaleSettings,
} from '@keen.io/charts-utils';

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
};

export const getColor = (idx: number, colors: string[]): string => {
  if (colors[idx]) return colors[idx];
  return colorPalette.black[500];
};

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
}: Options) => {
  const filteredKeys = getKeysDifference(keys, disabledKeys);
  const { precision, useUTC } = xScaleSettings;

  const dateNormalizer = precision
    ? (date: string) => normalizeDate(date, precision, useUTC)
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
    .rangeRound([0, yScale.bandwidth()])
    .domain(filteredKeys);

  const barHeight = yGroupScale.bandwidth();
  const range = new Array(yScale.domain().length).fill(true);

  let yCounter = 0;
  const keysOrder: Record<number, any> = {};

  if (barsOrder) {
    localizedData.forEach((_item: Record<string, any>, idx: number) => {
      yGroupScale
        .domain()
        .sort((a, b) => {
          if (barsOrder === 'descending') {
            return localizedData[idx]?.[b] - localizedData[idx]?.[a];
          } else {
            return localizedData[idx]?.[a] - localizedData[idx]?.[b];
          }
        })
        .forEach((keyName, index) => {
          if (!keysOrder[idx]) keysOrder[idx] = {};
          keysOrder[idx][keyName] = index;
        });
    });
  }

  const bars = keys.reduce((acc, keyName: string, idx: number) => {
    const barsGroup = [] as Bar[];
    const isDisabled =
      keyName === labelSelector || disabledKeys.includes(keyName);

    range.forEach((_d, index: number) => {
      const value = localizedData[index]?.[keyName];

      if (value && !isDisabled) {
        const orderPosition = barsOrder ? keysOrder[index][keyName] : yCounter;
        const bar = {
          key: `${index}.${keyName}`,
          selector: [index, keyName],
          x: value > 0 ? Math.abs(xScale(0)) : xScale(value),
          y:
            yScale(localizedData[index][labelSelector]) +
            barHeight * orderPosition,
          width: Math.abs(xScale(value) - xScale(0)),
          height: barHeight,
          color: getColor(idx, colors),
          value,
        };

        barsGroup.push(bar);
      }
    });

    if (!barsOrder && !disabledKeys.includes(keyName)) yCounter++;

    return [...acc, ...barsGroup];
  }, []);

  return {
    bars,
    xScale,
    yScale,
  };
};

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
}: Options) => {
  const filteredKeys = getKeysDifference(keys, disabledKeys);
  const { precision, useUTC } = xScaleSettings;

  const dateNormalizer = precision
    ? (date: string) => normalizeDate(date, precision, useUTC)
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
    .rangeRound([0, xScale.bandwidth()])
    .domain(filteredKeys);

  const barWidth = xGroupScale.bandwidth();
  const range = new Array(xScale.domain().length).fill(true);

  let xCounter = 0;
  const keysOrder: Record<number, any> = {};

  if (barsOrder) {
    localizedData.forEach((_item: Record<string, any>, idx: number) => {
      xGroupScale
        .domain()
        .sort((a, b) => {
          if (barsOrder === 'descending') {
            return localizedData[idx]?.[b] - localizedData[idx]?.[a];
          } else {
            return localizedData[idx]?.[a] - localizedData[idx]?.[b];
          }
        })
        .forEach((keyName, index) => {
          if (!keysOrder[idx]) keysOrder[idx] = {};
          keysOrder[idx][keyName] = index;
        });
    });
  }

  const bars = keys.reduce((acc, keyName: string, idx: number) => {
    const barsGroup = [] as Bar[];
    const isDisabled =
      keyName === labelSelector || disabledKeys.includes(keyName);

    range.forEach((_d, index: number) => {
      const value = localizedData[index]?.[keyName];

      if (value && !isDisabled) {
        const orderPosition = barsOrder ? keysOrder[index][keyName] : xCounter;
        const bar = {
          key: `${index}.${keyName}`,
          selector: [index, keyName],
          x:
            xScale(localizedData[index][labelSelector]) +
            barWidth * orderPosition,
          y: value > 0 ? yScale(value) : yScale(0),
          width: barWidth,
          height: Math.abs(yScale(value) - yScale(0)),
          color: getColor(idx, colors),
          value,
        };

        barsGroup.push(bar);
      }
    });

    if (!barsOrder && !disabledKeys.includes(keyName)) xCounter++;

    return [...acc, ...barsGroup];
  }, []);

  return {
    bars,
    xScale,
    yScale,
  };
};

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
}: Options) => {
  const bars = [] as Bar[];
  const filteredKeys = getKeysDifference(keys, disabledKeys);
  const { precision, useUTC } = xScaleSettings;

  const dateNormalizer = precision
    ? (date: string) => normalizeDate(date, precision, useUTC)
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

  const percentMin = minimum < 0 ? -100 : 0;
  const percentMax = maximum > 0 ? 100 : 0;

  minimum = stackMode === 'percent' ? percentMin : minimum;
  maximum = stackMode === 'percent' ? percentMax : maximum;

  const xScale = scaleLinear()
    .range([margins.left, dimension.width - margins.right])
    .domain([minimum, maximum]);

  const yScale = scaleBand()
    .range([dimension.height - margins.bottom, margins.top])
    .domain(normalizedData.map((item: any) => item[labelSelector]))
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
        color: getColor(keys.indexOf(keyName), colors),
        value: data[index][keyName],
      };

      bars.push(bar);
    });
  });

  return {
    bars,
    xScale,
    yScale,
  };
};

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
}: Options) => {
  const bars = [] as Bar[];
  const filteredKeys = getKeysDifference(keys, disabledKeys);
  const { precision, useUTC } = xScaleSettings;

  const dateNormalizer = precision
    ? (date: string) => normalizeDate(date, precision, useUTC)
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

  const percentMin = minimum < 0 ? -100 : 0;
  const percentMax = maximum > 0 ? 100 : 0;

  minimum = stackMode === 'percent' ? percentMin : minimum;
  maximum = stackMode === 'percent' ? percentMax : maximum;

  const xScale = scaleBand()
    .range([margins.left, dimension.width - margins.right])
    .domain(normalizedData.map((item: any) => item[labelSelector]))
    .padding(barPadding);

  const yScale = scaleLinear()
    .range([dimension.height - margins.bottom, margins.top])
    .domain([minimum, maximum]);

  stackMode !== 'percent' && calculateScaleDomain(yScale, minimum, maximum);

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
        color: getColor(keys.indexOf(keyName), colors),
        value: data[index][keyName],
      };

      bars.push(bar);
    });
  });

  return {
    bars,
    xScale,
    yScale,
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
