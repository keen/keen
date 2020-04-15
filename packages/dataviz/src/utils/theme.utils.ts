import deepMerge from 'deepmerge';
import {
  Theme as ChartTheme,
  theme as defaultChartTheme,
} from '@keen.io/charts';

export const extendTheme = (customTheme: Partial<ChartTheme> = {}) =>
  deepMerge(defaultChartTheme, customTheme as Partial<ChartTheme>, {
    arrayMerge: (_target, source) => source,
  });
