import { Layout } from '@keen.io/ui-core';

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
