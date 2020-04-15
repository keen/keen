/* eslint-disable @typescript-eslint/camelcase */
import { AtomicResult, Step } from '../types';

import { DEFAULT_NAME, KEEN_KEY, KEEN_VALUE } from '../constants';

export const transformFromNumber = (value: number) => ({
  results: [{ [KEEN_KEY]: DEFAULT_NAME, [KEEN_VALUE]: value }],
  keys: [KEEN_VALUE],
});

export const transformFunnel = ({
  steps,
  result,
}: {
  steps: Step[];
  result: number[];
}) => ({
  results: steps.map(({ event_collection }: Step, idx: number) => ({
    [KEEN_KEY]: event_collection,
    [KEEN_VALUE]: result[idx],
  })),
  keys: [KEEN_VALUE],
});

export const transformAtomicResult = ({
  result,
  ...properties
}: AtomicResult) => {
  if (Object.keys(properties).length > 1) {
    const groupedProperties = Object.keys(properties).reduce(
      ([currentKey, currentValue], key) => {
        const value = properties[key];
        const mergedValue = currentValue ? `${currentValue} ${value}` : value;
        const mergedKey = currentKey ? `${currentKey}-${key}` : key;

        return [mergedKey, mergedValue];
      },
      []
    );

    const [name, value] = groupedProperties;
    return {
      result,
      [name]: value,
    };
  }

  return {
    result,
    ...properties,
  };
};

export const transformIntervalsFromArray = (values: AtomicResult[]) => {
  const keys: Set<string> = new Set();
  const data: Record<string, any> = {};

  values.map(transformAtomicResult).forEach(({ result, ...properties }) => {
    Object.values(properties).forEach(name => {
      keys.add(name as string);
      data[name] = result;
    });
  });

  return {
    data,
    keys,
  };
};

export const transformExtraction = (ob: Record<string, any>) => {
  const toReturn: Record<string, any> = {};
  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if (typeof ob[i] == 'object' && ob[i] !== null) {
      const flatObject: Record<string, any> = transformExtraction(ob[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};
