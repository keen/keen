import { colors } from '@keen.io/colors';
import { Variant } from '../types';

const generateColors = (variant: Variant) => {
  let bgColor = colors[variant][100];
  let textColor = colors[variant][500];

  if (variant === 'white') {
    bgColor = colors[variant][200];
  }

  if (variant === 'gray') {
    bgColor = colors[variant][300];
    textColor = colors.black[100];
  }

  return {
    bgColor,
    textColor,
  };
};

export default generateColors;
