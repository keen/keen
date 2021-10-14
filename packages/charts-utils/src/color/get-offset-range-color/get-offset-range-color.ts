import { transparentize } from 'polished';
import { colors as colorPalette } from '@keen.io/colors';
/**
 * Get color for the bar, if the pallete ends return gray with 50% opacity
 *
 * @param idx - index of the bar
 * @param colors - colors array
 * @param dataSeriesOffset - offset range
 * @param defaultColor - color for not active elements
 * @return a color for a bar
 *
 */

const getOffsetRangeColor = (
  idx: number,
  colors: string[],
  dataSeriesOffset: [number, number] = [0, colors.length],
  defaultColor: string = transparentize(0.5, colorPalette.gray[500])
): string => {
  const index =
    idx >= colors.length
      ? idx - colors.length * Math.floor(idx / colors.length)
      : idx;
  if (dataSeriesOffset[0] <= idx && dataSeriesOffset[1] > idx)
    return colors[index];
  return defaultColor;
};

export default getOffsetRangeColor;
