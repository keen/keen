import {
  parseQuery,
  parseMultipleQueries,
  mergeResults,
  createScaleSettings,
  mapKeys,
  Query,
  Step,
  AnalysisResult,
} from '@keen.io/parser';

import { VisualizationInput } from '../types';

export const prepareVisualization = (
  input: VisualizationInput | VisualizationInput[] = {},
  keysMap?: Record<string, string>
) => {
  let keys: string[] = [];
  let results: Record<string, any>[] = [];
  let scaleSettings = {};

  if (Array.isArray(input)) {
    const analysisCollection = input as {
      query?: Query;
      steps?: Step[];
      result: AnalysisResult;
    }[];

    const [firstAnalysys] = input;
    if (firstAnalysys.query)
      scaleSettings = createScaleSettings(firstAnalysys.query);

    const parsedQueries = parseMultipleQueries(analysisCollection);
    const mergedResults = mergeResults(analysisCollection, parsedQueries);

    keys = mergedResults.keys;
    results = mergedResults.results;
  } else {
    const parser = parseQuery(input as any);
    if (input.query) scaleSettings = createScaleSettings(input.query);
    keys = parser.keys;
    results = parser.results;
  }

  if (keysMap) {
    const mappings = mapKeys(keysMap, keys, results);

    keys = mappings.keys;
    results = mappings.results;
  }

  return {
    keys,
    results,
    scaleSettings,
  };
};
