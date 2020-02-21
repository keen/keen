import deepMerge from 'deepmerge';
import { Theme, theme as defaultTheme } from '@keen.io/charts';

export const extendTheme = (customTheme: Partial<Theme> = {}) =>
  deepMerge(defaultTheme, customTheme, {
    arrayMerge: (_target, source) => source,
  });
