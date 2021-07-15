import { colors as palette } from '@keen.io/colors';

export const stringifyColors = (colors: string[], zeroPoint: number) => {
  const newColors = colors.map((color) => {
    if (color === palette.white[500]) return `${color} ${zeroPoint}%`;
    return color;
  });
  return newColors.join(', ');
};
