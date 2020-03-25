import { createComputedKey } from './utils/keys.utils';

import { DEFAULT_LABEL_KEY } from './constants';

import { ParserInput } from './types';

export const mergeAnalysisResults = (
  analysis: ParserInput[],
  parsedResults: {
    keys: string[];
    results: Record<string, any>[];
  }[]
) => {
  const keys: Set<string> = new Set();
  const data: Record<string, any>[] = [];

  analysis.forEach(({ query }, idx: number) => {
    const computedKey = createComputedKey(query, idx);
    const extractedKeys = parsedResults[idx].keys;

    parsedResults[idx].results.forEach((item, itemIndex: number) => {
      const mergedData = data[itemIndex] || {};

      extractedKeys.forEach(key => {
        const mergedKey = `${computedKey}.${key}`;
        mergedData[DEFAULT_LABEL_KEY] = item[DEFAULT_LABEL_KEY];

        mergedData[mergedKey] = item[key];
        keys.add(mergedKey);
      });

      data[itemIndex] = mergedData;
    });
  });

  return {
    keys: [...keys],
    results: data,
  };
};
