import { AtomicResult } from '../types';

import { DEFAULT_NAME, DEFAULT_VALUE_KEY } from '../constants';

export const transformFromNumber = (value: number) => ({
  results: [{ name: DEFAULT_NAME, value }],
  keys: [DEFAULT_VALUE_KEY],
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
