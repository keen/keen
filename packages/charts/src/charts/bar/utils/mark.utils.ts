import { Layout } from '@keen.io/ui-core';

type MarkVariants = 'normal' | 'small';

export const MARK_VARIANTS: Record<MarkVariants, Record<string, any>> = {
  normal: {
    outerRadius: 10,
    innerRadius: 4,
    strokeWidth: 4,
  },
  small: {
    outerRadius: 7,
    innerRadius: 3,
    strokeWidth: 3,
  },
};

const MARK_TRESHOLD = 35;

/**
 * Calculate mark position based on bar data
 *
 * @param layout - layout of the chart
 * @param x - x position of the bar
 * @param y - y position of the bar
 * @param width - width of the bar
 * @param height - height of the bar
 * @param positiveValue - if bar have positive value to display mark correctly
 * @return x and y for mark position
 *
 */

export const calculateMarkPosition = ({
  layout,
  x,
  y,
  width,
  height,
  positiveValue,
}: {
  layout: Layout;
  x: number;
  y: number;
  width: number;
  height: number;
  positiveValue: boolean;
}) => {
  if (layout === 'vertical') {
    return {
      x: x + width * 0.5,
      y: positiveValue ? y : y + height,
    };
  }

  return {
    x: positiveValue ? x + width : x,
    y: y + height * 0.5,
  };
};

/**
 * Set mark size based on plot layout and width/height of the bar
 *
 * @param layout - layout of the chart
 * @param width - width of the bar
 * @param height - height of the bar
 * @return x and y for mark position
 *
 */

export const setMarkSize = ({
  layout,
  height,
  width,
}: {
  layout: Layout;
  width: number;
  height: number;
}) => {
  if (layout === 'vertical') {
    return width < MARK_TRESHOLD
      ? MARK_VARIANTS['small']
      : MARK_VARIANTS['normal'];
  }
  return height < MARK_TRESHOLD
    ? MARK_VARIANTS['small']
    : MARK_VARIANTS['normal'];
};
