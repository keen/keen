import { Dimension, Margins } from '../../types';
import { X_AXIS_PADDING } from '../axes.component';

export const calculateVerticalOffset = (
  alignment: string,
  svgDimensions: Dimension,
  margins: Margins
) => {
  let offset;

  switch (alignment) {
    case 'top':
      offset = -margins.top;
      break;
    case 'bottom':
      offset = -svgDimensions.height - X_AXIS_PADDING + margins.bottom;
      break;
    default:
      offset = -svgDimensions.height / 2;
  }

  return offset;
};

export const calculateHorizontalOffset = (
  alignment: string,
  svgDimensions: Dimension,
  margins: Margins
) => {
  let offset;

  switch (alignment) {
    case 'left':
      offset = margins.left;
      break;
    case 'right':
      offset = svgDimensions.width - margins.right;
      break;
    default:
      offset = svgDimensions.width / 2;
  }

  return offset;
};

export const getTextAnchor = (alignment: string) => {
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
