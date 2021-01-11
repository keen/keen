import { scaleBand, scaleLinear } from 'd3-scale';
import { stack, stackOffsetDiverging } from 'd3-shape';

import { Layout, SortMode } from '@keen.io/ui-core';
import {
  calculateRange,
  calculateStackedRange,
  calculateScaleDomain,
  getKeysDifference,
  transformToPercent,
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
  return '#000000';
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
}: Options) => {
  const filteredKeys = getKeysDifference(keys, disabledKeys);
  const { minimum, maximum } = calculateRange(data, minValue, maxValue, keys);

  const xScale = scaleLinear()
    .range([margins.left, dimension.width - margins.right])
    .domain([minimum, maximum]);

  calculateScaleDomain(xScale, minimum, maximum);

  const yScale = scaleBand()
    .range([dimension.height - margins.bottom, margins.top])
    .domain(data.map((item: any) => item[labelSelector]).reverse())
    .padding(barPadding);

  const yGroupScale = scaleBand()
    .rangeRound([0, yScale.bandwidth()])
    .domain(filteredKeys);

  const barHeight = yGroupScale.bandwidth();
  const range = new Array(yScale.domain().length).fill(true);

  let yCounter = 0;
  const keysOrder: Record<number, any> = {};

  if (barsOrder) {
    data.forEach((_item: Record<string, any>, idx: number) => {
      yGroupScale
        .domain()
        .sort((a, b) => {
          if (barsOrder === 'descending') {
            return data[idx]?.[b] - data[idx]?.[a];
          } else {
            return data[idx]?.[a] - data[idx]?.[b];
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
      const value = data[index]?.[keyName];

      if (value && !isDisabled) {
        const orderPosition = barsOrder ? keysOrder[index][keyName] : yCounter;
        const bar = {
          key: `${index}.${keyName}`,
          selector: [index, keyName],
          x: value > 0 ? Math.abs(xScale(0)) : xScale(value),
          y: yScale(data[index][labelSelector]) + barHeight * orderPosition,
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
}: Options) => {
  const filteredKeys = getKeysDifference(keys, disabledKeys);
  const { minimum, maximum } = calculateRange(data, minValue, maxValue, keys);

  const xScale = scaleBand()
    .range([margins.left, dimension.width - margins.right])
    .domain(data.map((item: any) => item[labelSelector]))
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
    data.forEach((_item: Record<string, any>, idx: number) => {
      xGroupScale
        .domain()
        .sort((a, b) => {
          if (barsOrder === 'descending') {
            return data[idx]?.[b] - data[idx]?.[a];
          } else {
            return data[idx]?.[a] - data[idx]?.[b];
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
      const value = data[index]?.[keyName];

      if (value && !isDisabled) {
        const orderPosition = barsOrder ? keysOrder[index][keyName] : xCounter;
        const bar = {
          key: `${index}.${keyName}`,
          selector: [index, keyName],
          x: xScale(data[index][labelSelector]) + barWidth * orderPosition,
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
}: Options) => {
  const bars = [] as Bar[];
  const filteredKeys = getKeysDifference(keys, disabledKeys);

  const normalizedData =
    stackMode === 'normal' ? data : transformToPercent(data, filteredKeys);

  const stackedData = stack().keys(filteredKeys).offset(stackOffsetDiverging)(
    normalizedData
  );

  const { minimum, maximum } =
    stackMode === 'normal'
      ? calculateStackedRange(normalizedData, minValue, maxValue, filteredKeys)
      : { minimum: 0, maximum: 100 };

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
}: Options) => {
  const bars = [] as Bar[];
  const filteredKeys = getKeysDifference(keys, disabledKeys);

  const normalizedData =
    stackMode === 'normal' ? data : transformToPercent(data, filteredKeys);

  const stackedData = stack().keys(filteredKeys).offset(stackOffsetDiverging)(
    normalizedData
  );

  const { minimum, maximum } =
    stackMode === 'normal'
      ? calculateStackedRange(normalizedData, minValue, maxValue, filteredKeys)
      : { minimum: 0, maximum: 100 };

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
