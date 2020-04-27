import { Orientation, Theme, Line as LineType } from '../types';
import { Position, Layout } from '@keen.io/ui-core';

export const getHorizontalPosition = (
  alignment: Position | 'center',
  line: LineType
) => {
  let x;
  const { x1, x2 } = line;
  switch (alignment) {
    case 'left':
      x = x1;
      break;
    case 'right':
      x = x2;
      break;
    default:
      x = x1 + (x2 - x1) / 2;
  }

  return x;
};

export const getVerticalPosition = (
  alignment: Position | 'center',
  line: LineType
) => {
  let y;
  const { y1, y2 } = line;
  switch (alignment) {
    case 'top':
      y = -y2;
      break;
    case 'bottom':
      y = -y1;
      break;
    default:
      y = -(y1 + (y2 - y1) / 2);
  }

  return y;
};

export const getTextAnchor = (alignment: Position | 'center') => {
  let textAnchor;

  switch (alignment) {
    case 'left':
    case 'bottom':
      textAnchor = 'start';
      break;
    case 'right':
    case 'top':
      textAnchor = 'end';
      break;
    default:
      textAnchor = 'middle';
  }

  return textAnchor;
};

export const getAxisTheme = (
  layout: Layout,
  orientation: Orientation,
  theme: Theme
) => {
  let axisTheme;

  switch (true) {
    case layout === 'vertical' && orientation === Orientation.HORIZONTAL:
    case layout === 'horizontal' && orientation === Orientation.VERTICAL:
    case !layout && orientation === Orientation.VERTICAL:
      axisTheme = theme.axisY;
      break;
    default:
      axisTheme = theme.axisX;
  }

  return axisTheme;
};
