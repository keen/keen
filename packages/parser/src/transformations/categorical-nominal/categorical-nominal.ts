import { Query } from '@keen.io/query';

import { KEEN_VALUE } from '../../constants';

/**
 * Transforms categorized nominal data.
 *
 * @param parserInput - Parser input properties
 * @return transformed results
 *
 */
export const transformCategoricalNominal = ({
  result,
}: {
  query?: Query;
  result: Record<string, any>[];
}) => {
  const data: Record<string, any>[] = [];
  const keys: Set<string> = new Set();

  keys.add(KEEN_VALUE);
  result.forEach(({ result: nominalValues, ...properties }) => {
    const record = {
      [KEEN_VALUE]: nominalValues,
      ...properties,
    };

    data.push(record);
    Object.keys(properties).forEach((key) => keys.add(key));
  });

  return {
    data,
    keys: [...keys],
  };
};
