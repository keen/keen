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
