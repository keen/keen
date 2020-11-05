import { transformAtomicResult } from '../atomic-result';

import { AtomicResult } from '../../types';

/**
 * Transforms array of interval values
 *
 * @param values - collection of Keen API atomic results
 * @return transformed atomic results
 *
 */
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
