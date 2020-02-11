import { scaleBand, scaleLinear } from 'd3-scale';

import { Layout } from '@keen.io/ui-core';

import { calculateRange, calculateScaleDomain } from '../../utils';
import { Dimension, Margins } from '../../types';

type Options = {
  data: Record<string, any>[];
  keys: string[];
  labelSelector: string;
  dimension: Dimension;
  margins: Margins;
  layout: Layout;
  barPadding: number;
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

export const generateHorizontalBars = ({
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

export const generateVerticalBars = ({
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

export const generateBars = (options: Options) =>
  options.layout === 'vertical'
    ? generateVerticalBars(options)
    : generateHorizontalBars(options);
