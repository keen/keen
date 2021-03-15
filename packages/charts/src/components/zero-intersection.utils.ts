import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { Layout } from '@keen.io/ui-core';
import { Orientation, Dimension, Margins } from '../types';

export const getZeroIntersectionVisibility = (
  layout: Layout,
  xScale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>,
  yScale: ScaleBand<string> | ScaleLinear<number, number>,
  enabledGridX: boolean,
  enabledGridY: boolean
) => {
  const verticalLayout = layout === Orientation.VERTICAL;
  const scaleDomain = verticalLayout ? yScale.domain() : xScale.domain();
  const isVisible = scaleDomain[0] < 0 && scaleDomain[1] > 0;
  const enabled = verticalLayout ? enabledGridY : enabledGridX;

  return isVisible && enabled;
};

export const calculateZeroIntersection = (
  layout: Layout,
  xScale:
    | ScaleBand<string | number>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>,
  yScale: ScaleBand<string | number> | ScaleLinear<number, number>,
  dimensions: Dimension,
  margins: Margins
) => {
  const verticalLayout = layout === Orientation.VERTICAL;
  const scale = verticalLayout ? yScale : xScale;

  if (verticalLayout)
    return {
      x1: margins.left,
      y1: scale(0),
      x2: dimensions.width - margins.right,
      y2: scale(0),
    };
  return {
    x1: scale(0),
    y1: margins.top,
    x2: scale(0),
    y2: dimensions.height - margins.bottom,
  };
};
