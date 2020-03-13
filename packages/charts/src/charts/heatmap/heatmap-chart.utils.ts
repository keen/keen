import { scaleBand } from 'd3-scale';
import { Options, BlockType } from './types';

import { calculateColorScale } from '../../utils/colors.utils';

import { calculateRange } from '../../utils';

export const generateVerticalBlocks = ({
  data,
  keys,
  dimension,
  margins,
  minValue,
  maxValue,
  labelSelector,
}: Options) => {
  const { minimum, maximum } = calculateRange(data, minValue, maxValue, keys);

  const xScale = scaleBand()
    .range([margins.left, dimension.width - margins.right])
    .domain(keys.map((item: any) => item));

  const yScale = scaleBand()
    .range([dimension.height - margins.bottom, margins.top])
    .domain(data.map((item: any) => item[labelSelector]));

  const color = calculateColorScale(minimum, maximum);

  const blocks: BlockType[] = [];
  keys.forEach((keyName: string) => {
    data.forEach((_d: any, index: number) => {
      const value = data[index]?.[keyName];

      if (keyName !== labelSelector && value) {
        const block = {
          key: `${index}.${keyName}.block`,
          selector: [index, keyName],
          x: xScale(keyName),
          y: yScale(_d[labelSelector]),
          height: yScale.bandwidth(),
          width: xScale.bandwidth(),
          color: color(value),
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
}: Options) => {
  const { minimum, maximum } = calculateRange(data, minValue, maxValue, keys);

  const xScale = scaleBand()
    .range([margins.left, dimension.width - margins.right])
    .domain(data.map((item: any) => item[labelSelector]));

  const yScale = scaleBand()
    .range([dimension.height - margins.bottom, margins.top])
    .domain(keys.map((item: any) => item));

  const color = calculateColorScale(minimum, maximum);

  const blocks: BlockType[] = [];
  keys.forEach((keyName: string) => {
    data.forEach((_d: any, index: number) => {
      const value = data[index]?.[keyName];

      if (keyName !== labelSelector && value) {
        const block = {
          key: `${index}.${keyName}.block`,
          selector: [index, keyName],
          x: xScale(_d[labelSelector]),
          y: yScale(keyName),
          height: yScale.bandwidth(),
          width: xScale.bandwidth(),
          color: color(value),
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
  const { layout, xScaleSettings, yScaleSettings } = options;

  const scaleSettings =
    layout === 'vertical'
      ? {
          xScaleSettings,
          yScaleSettings,
        }
      : {
          xScaleSettings: yScaleSettings,
          yScaleSettings: xScaleSettings,
        };

  return {
    scaleSettings,
    ...BLOCK_RENDER_MAP[layout].call(null, options),
  };
};
