import { scaleBand, scaleLinear } from 'd3-scale';
import { stack, stackOffsetDiverging } from 'd3-shape';

import { Layout } from '@keen.io/ui-core';

import {
  normalizeToPercent,
  calculateRange,
  calculateStackedRange,
  calculateScaleDomain,
} from '../../utils';
import { Dimension, Margins } from '../../types';

type Options = {
  data: Record<string, any>[];
  keys: string[];
  labelSelector: string;
  dimension: Dimension;
  margins: Margins;
  layout: Layout;
  barPadding: number;
  groupMode: 'stacked' | 'grouped';
  stackMode: 'normal' | 'percent';
  minValue?: number | 'auto';
  maxValue?: number | 'auto';
  colors: string[];
};

export type Bar = {
  key: string;
  selector: (string | number)[];
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;
};

export const calculateMarkPosition = ({
  layout,
  x,
  y,
  width,
  height,
}: {
  layout: Layout;
  x: number;
  y: number;
  width: number;
  height: number;
}) => {
  if (layout === 'vertical') {
    return {
      x: x + width * 0.5,
      y,
    };
  }

  return {
    x: x + width,
    y: y + height * 0.5,
  };
};

export const generateHorizontalGroupedBars = ({
  data,
  keys,
  dimension,
  margins,
  minValue,
  maxValue,
  barPadding,
  labelSelector,
  colors,
}: Options) => {
  const { minimum, maximum } = calculateRange(data, minValue, maxValue, keys);

  const xScale = scaleLinear()
    .range([margins.left, dimension.width - margins.right])
    .domain([minimum, maximum]);

  calculateScaleDomain(xScale, minimum, maximum);

  const yScale = scaleBand()
    .range([dimension.height - margins.bottom, margins.top])
    .domain(data.map((item: any) => item[labelSelector]))
    .padding(barPadding);

  const yGroupScale = scaleBand()
    .rangeRound([0, yScale.bandwidth()])
    .domain(keys);

  const barHeight = yGroupScale.bandwidth();
  const range = new Array(yScale.domain().length).fill(true);

  const bars = keys.reduce((acc, keyName: string, idx: number) => {
    const barsGroup = [] as Bar[];

    range.forEach((_d, index: number) => {
      const value = data[index]?.[keyName];

      if (keyName !== labelSelector && value) {
        const bar = {
          key: `${index}.${keyName}`,
          selector: [index, keyName],
          x: 0 + margins.left,
          y: yScale(data[index][labelSelector]) + barHeight * idx,
          width: xScale(value) - margins.left,
          height: barHeight,
          color: colors[idx],
        };

        barsGroup.push(bar);
      }
    });

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
  keys,
  colors,
  labelSelector,
}: Options) => {
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
    .domain(keys);

  const barWidth = xGroupScale.bandwidth();
  const range = new Array(xScale.domain().length).fill(true);

  const bars = keys.reduce((acc, keyName: string, idx: number) => {
    const barsGroup = [] as Bar[];

    range.forEach((_d, index: number) => {
      const value = data[index]?.[keyName];

      if (keyName !== labelSelector && value) {
        const bar = {
          key: `${index}.${keyName}`,
          selector: [index, keyName],
          x: xScale(data[index][labelSelector]) + barWidth * idx,
          y: yScale(value),
          width: barWidth,
          height: dimension.height - margins.bottom - yScale(value),
          color: colors[idx],
        };

        barsGroup.push(bar);
      }
    });

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
  colors,
  stackMode,
  labelSelector,
}: Options) => {
  const bars = [] as Bar[];

  const normalizedData =
    stackMode === 'normal' ? data : normalizeToPercent(data, keys);

  const stackedData = stack()
    .keys(keys)
    .offset(stackOffsetDiverging)(normalizedData);

  const { minimum, maximum } =
    stackMode === 'normal'
      ? calculateStackedRange(normalizedData, minValue, maxValue, keys)
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

  stackedData.forEach((item: any, idx: number) => {
    const keyName = item.key;

    range.forEach((_d, index: number) => {
      const [rangeMin, rangeMax] = item[index];

      const bar = {
        key: `${index}.${keyName}`,
        selector: [index, keyName],
        x: xScale(rangeMin),
        y: yScale(normalizedData[index][labelSelector]),
        width: xScale(rangeMax) - xScale(rangeMin),
        height: barHeight,
        color: colors[idx],
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
  colors,
  stackMode,
  labelSelector,
}: Options) => {
  const bars = [] as Bar[];

  const normalizedData =
    stackMode === 'normal' ? data : normalizeToPercent(data, keys);

  const stackedData = stack()
    .keys(keys)
    .offset(stackOffsetDiverging)(normalizedData);

  const { minimum, maximum } =
    stackMode === 'normal'
      ? calculateStackedRange(normalizedData, minValue, maxValue, keys)
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

  stackedData.forEach((item: any, idx: number) => {
    const keyName = item.key;

    range.forEach((_d, index: number) => {
      const [rangeMin, rangeMax] = item[index];

      const bar = {
        key: `${index}.${keyName}`,
        selector: [index, keyName],
        x: xScale(normalizedData[index][labelSelector]),
        y: yScale(rangeMax),
        width: barWidth,
        height: yScale(rangeMin) - yScale(rangeMax),
        color: colors[idx],
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
  const { layout, groupMode } = options;
  return BAR_RENDER_MAP[groupMode][layout].call(null, options);
};
