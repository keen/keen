import { createComputedKey } from './utils/keys.utils';

import { KEEN_KEY } from './constants';

import { ParserInput, TransformOutput } from './types';

export const mergeParsedResults = (
  analysisCollection: ParserInput[],
  parserOutput: TransformOutput[]
) => {
  const keys: Set<string> = new Set();
  const data: Record<string, any>[] = [];

  analysisCollection.forEach(({ query }, idx: number) => {
    const computedKey = createComputedKey(query, idx);
    const extractedKeys = parserOutput[idx].keys;

    parserOutput[idx].data.forEach((item, itemIndex: number) => {
      const mergedData = data[itemIndex] || {};

      extractedKeys.forEach((key) => {
        const mergedKey = `${computedKey}.${key}`;
        mergedData[KEEN_KEY] = item[KEEN_KEY];

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
