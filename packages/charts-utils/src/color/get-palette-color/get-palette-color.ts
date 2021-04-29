import { transparentize } from 'polished';
import { colors as colorPalette } from '@keen.io/colors';

/**
 * Get color for the bar, if the pallete ends return gray with 50% opacity
 *
 * @param idx - index of the bar
 * @param colors - colors array
 * @return a color for a bar
 *
 */

const getPaletteColor = (idx: number, colors: string[]): string => {
  if (colors[idx]) return colors[idx];
  return transparentize(0.5, colorPalette.gray[500]);
};

export default getPaletteColor;
