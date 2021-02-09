import deepMerge from 'deepmerge';
import {
  Theme as ChartTheme,
  theme as defaultChartTheme,
} from '@keen.io/charts';

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
