import {
  parseQuery,
  parseQueries,
  mergeParsedResults,
  mapKeys,
  KEEN_KEY,
  AnalysisResult,
} from '@keen.io/parser';
import { Query, Step } from '@keen.io/query';
import { Widgets } from '@keen.io/widgets';

import { VisualizationInput, ComponentSettings } from '../types';

export const prepareVisualization = (
  input: VisualizationInput | VisualizationInput[] = {},
  keysMap: Record<string, string>,
  componentSettings: ComponentSettings,
  type?: Widgets
) => {
  let keys: string[] = [];
  let results: Record<string, any>[] = [];
  if (Array.isArray(input)) {
    const analysisCollection = input as {
      query?: Query;
      steps?: Step[];
      result: AnalysisResult;
    }[];

    const parsedQueries = parseQueries(analysisCollection, type);
    const mergedResults = mergeParsedResults(analysisCollection, parsedQueries);

    keys = mergedResults.keys;
    results = mergedResults.results;
  } else {
    const parser = parseQuery(input as any, type);
    keys = parser.keys;
    results = parser.data;
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
