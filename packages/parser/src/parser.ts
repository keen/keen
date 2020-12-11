import {
  transformAtomicResult,
  transformIntervalsFromArray,
  transformFunnel,
  transformExtraction,
  transformFromNumber,
} from './transformations';

import { createParserSettings } from './create-parser-settings';
import { fillWithEmptyKeys } from './utils/transform.utils';

import { localizeDate } from './utils';

import {
  ParserInput,
  ParserOutput,
  IntervalResult,
  AtomicResult,
} from './types';

import { KEEN_KEY, KEEN_VALUE } from './constants';

export const parseQuery = ({
  result,
  steps,
  query,
}: ParserInput): ParserOutput => {
  const {
    mergePropertiesOrder,
    fillEmptyIntervalsKeys,
    intervalPrecision,
  } = createParserSettings(query);

  let keys: Set<string> = new Set();
  let results: Record<string, any>[] = [];

  if (steps && Array.isArray(result)) {
    const funnelResults = result as number[];
    return transformFunnel({ result: funnelResults, steps });
  }

  if (typeof result === 'number') {
    return transformFromNumber(result);
  }

  let extractionKeys: string[] = [];

  Array.isArray(result) &&
    result.forEach(
      (partialResult: null | number | IntervalResult | AtomicResult) => {
        if (
          typeof partialResult === 'number' ||
          typeof partialResult === 'string' ||
          partialResult === null
        ) {
          keys.add(KEEN_VALUE);
          results.push({ [KEEN_VALUE]: partialResult });
        }

        if (
          typeof partialResult === 'object' &&
          partialResult !== null &&
          'value' in partialResult &&
          'timeframe' in partialResult
        ) {
          const { value, timeframe } = partialResult as IntervalResult;
          const localizedDate = intervalPrecision
            ? localizeDate(timeframe.start, intervalPrecision)
            : timeframe.start;

          if (Array.isArray(value)) {
            const { data, keys: dataSetKeys } = transformIntervalsFromArray(
              value,
              mergePropertiesOrder
            );
            results.push({ [KEEN_KEY]: localizedDate, ...data });
            dataSetKeys.forEach(key => keys.add(key));
          }

          if (typeof value === 'number') {
            keys.add(KEEN_VALUE);
            results.push({
              [KEEN_KEY]: localizedDate,
              [KEEN_VALUE]: value,
            });
          }
        }

        if (
          typeof partialResult === 'object' &&
          partialResult !== null &&
          'result' in partialResult
        ) {
          const { result, ...properties } = transformAtomicResult(
            partialResult,
            mergePropertiesOrder
          );
          keys.add(KEEN_VALUE);

          Object.values(properties).forEach(property => {
            results.push({ [KEEN_KEY]: property, [KEEN_VALUE]: result });
          });
        }

        if (
          typeof partialResult === 'object' &&
          partialResult !== null &&
          !('value' in partialResult) &&
          !('timeframe' in partialResult) &&
          !('result' in partialResult)
        ) {
          if (Object.keys(partialResult).length != 0) {
            const transformedResult = transformExtraction(partialResult);
            extractionKeys = [
              ...extractionKeys,
              ...Object.keys(transformedResult),
            ];
            results.push(transformedResult);
          }
        }
      }
    );

  if (fillEmptyIntervalsKeys) {
    results = fillWithEmptyKeys(keys, results, 0);
  }

  //double mapping for extraction
  if (extractionKeys.length) {
    keys = new Set(extractionKeys);
    results = fillWithEmptyKeys(keys, results);
  }

  return {
    keys: [...keys],
    results,
  };
};

export const parseMultipleQueries = (input: ParserInput[]) =>
  input.map(analysys => parseQuery(analysys));
