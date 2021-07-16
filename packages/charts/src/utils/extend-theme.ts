import deepMerge from 'deepmerge';
import { Theme as ChartTheme } from '../types';
import { theme as defaultChartTheme } from '../theme';

/**
 * Extends visualization theme with custom settings
 *
 * @param customTheme - partial theme object
 * @return theme settings
 *
 */
export const extendTheme = (customTheme: Partial<ChartTheme> = {}) =>
  deepMerge(defaultChartTheme, customTheme as Partial<ChartTheme>, {
    arrayMerge: (_target, source) => source,
  });
