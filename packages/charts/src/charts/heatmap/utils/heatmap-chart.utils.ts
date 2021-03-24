import { scaleBand } from 'd3-scale';
import { calculateRange, normalizeDate } from '@keen.io/charts-utils';

import { Options, BlockType } from '../types';

import { calculateColorScale } from '../../../utils/colors.utils';

export const generateVerticalBlocks = ({
  data,
  keys,
  dimension,
  margins,
  minValue,
  maxValue,
  labelSelector,
  colorMode,
  steps,
  range,
  yScaleSettings,
}: Options) => {
  const { minimum, maximum } = calculateRange(data, minValue, maxValue, keys);
  const { type: scaleType, precision } = yScaleSettings;

  const dateNormalizer =
    scaleType === 'time' && precision
      ? (date: string) => normalizeDate(date, precision)
      : null;

  const localizedData = dateNormalizer
    ? data.map((item) => ({
        ...item,
        [labelSelector]: dateNormalizer(item[labelSelector]),
      }))
    : data;

  const xScale = scaleBand()
    .range([margins.left, dimension.width - margins.right])
    .domain(keys.map((item: any) => item));

  const yScale = scaleBand()
    .range([dimension.height - margins.bottom, margins.top])
    .domain(localizedData.map((item: any) => item[labelSelector]));

  const color = calculateColorScale(minimum, maximum, colorMode, steps);

  const blocks: BlockType[] = [];
  keys.forEach((keyName: string) => {
    localizedData.forEach((_d: any, index: number) => {
      const value = localizedData[index]?.[keyName];
      const inRange = range ? value >= range.min && value <= range.max : true;
      if (keyName !== labelSelector && value >= 0 && inRange) {
        const block = {
          key: `${index}.${keyName}.block`,
          selector: [index, keyName],
          x: xScale(keyName),
          y: yScale(_d[labelSelector]),
          height: yScale.bandwidth(),
          width: xScale.bandwidth(),
          color: color(value),
          value,
        };

        blocks.push(block);
      }
    });
  });

  return {
    blocks,
    xScale,
    yScale,
  };
};

export const generateHorizontalBlocks = ({
  data,
  keys,
  dimension,
  margins,
  minValue,
  maxValue,
  labelSelector,
  colorMode,
  steps,
  range,
  yScaleSettings,
}: Options) => {
  const { minimum, maximum } = calculateRange(data, minValue, maxValue, keys);
  const { type: scaleType, precision } = yScaleSettings;

  const dateNormalizer =
    scaleType === 'time' && precision
      ? (date: string) => normalizeDate(date, precision)
      : null;

  const localizedData = dateNormalizer
    ? data.map((item) => ({
        ...item,
        [labelSelector]: dateNormalizer(item[labelSelector]),
      }))
    : data;

  const xScale = scaleBand()
    .range([margins.left, dimension.width - margins.right])
    .domain(localizedData.map((item: any) => item[labelSelector]));

  const yScale = scaleBand()
    .range([dimension.height - margins.bottom, margins.top])
    .domain(keys.map((item: any) => item));

  const color = calculateColorScale(minimum, maximum, colorMode, steps);

  const blocks: BlockType[] = [];
  keys.forEach((keyName: string) => {
    localizedData.forEach((_d: any, index: number) => {
      const value = data[index]?.[keyName];
      const inRange = range ? value >= range.min && value <= range.max : true;
      if (keyName !== labelSelector && value >= 0 && inRange) {
        const block = {
          key: `${index}.${keyName}.block`,
          selector: [index, keyName],
          x: xScale(_d[labelSelector]),
          y: yScale(keyName),
          height: yScale.bandwidth(),
          width: xScale.bandwidth(),
          color: color(value),
          value,
        };

        blocks.push(block);
      }
    });
  });

  return {
    blocks,
    xScale,
    yScale,
  };
};

const BLOCK_RENDER_MAP: Record<string, any> = {
  vertical: generateVerticalBlocks,
  horizontal: generateHorizontalBlocks,
};

export const generateBlocks = (options: Options) => {
  const {
    layout,
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
    ...BLOCK_RENDER_MAP[layout].call(null, options),
  };
};
