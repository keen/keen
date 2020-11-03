import {
  parseQuery,
  parseMultipleQueries,
  mergeResults,
  mapKeys,
  KEEN_KEY,
  Query,
  Step,
  AnalysisResult,
} from '@keen.io/parser';

import { VisualizationInput, ComponentSettings } from '../types';

export const prepareVisualization = (
  input: VisualizationInput | VisualizationInput[] = {},
  keysMap: Record<string, string>,
  componentSettings: ComponentSettings
) => {
  let keys: string[] = [];
  let results: Record<string, any>[] = [];

  if (Array.isArray(input)) {
    const analysisCollection = input as {
      query?: Query;
      steps?: Step[];
      result: AnalysisResult;
    }[];

    const parsedQueries = parseMultipleQueries(analysisCollection);
    const mergedResults = mergeResults(analysisCollection, parsedQueries);

    keys = mergedResults.keys;
    results = mergedResults.results;
  } else {
    const parser = parseQuery(input as any);
    keys = parser.keys;
    results = parser.results;
  }

  if (keysMap) {
    const labelSelector =
      'labelSelector' in componentSettings
        ? componentSettings.labelSelector
        : KEEN_KEY;
    const mappings = mapKeys(keysMap, keys, results, labelSelector);

    keys = mappings.keys;
    results = mappings.results;
  }

  return {
    keys,
    results,
  };
};
