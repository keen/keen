import deepMerge from 'deepmerge';

/**
 * Extends chart settings
 *
 * @param chartsSettingsFromQuery - settings created based on query definition
 * @param baseSettings - settings provided to DataViz instance
 * @return chart settings
 *
 */
export const extendChartSettings = (
  chartsSettingsFromQuery: Record<string, any>,
  baseSettings: Record<string, any>
) =>
  deepMerge(chartsSettingsFromQuery, baseSettings, {
    arrayMerge: (_target, source) => source,
  });
