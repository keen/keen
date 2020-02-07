import { Value } from './types';

import { DEFAULT_NAME, DEFAULT_VALUE_KEY } from './constants';

export const transformFromNumber = (value: number) => ({
  results: [{ name: DEFAULT_NAME, value }],
  keys: [DEFAULT_VALUE_KEY],
  formatLabel: undefined as undefined,
});

export const transformFromArray = (values: Value[]) => {
  const keys: Set<string> = new Set();
  const data: Record<string, any> = {};

  values.forEach(({ result, ...properties }) => {
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
