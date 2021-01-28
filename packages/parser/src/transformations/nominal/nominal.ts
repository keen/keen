import { Query } from '@keen.io/query';

import { KEEN_VALUE } from '../../constants';

/**
 * Transforms nominal data.
 *
 * @param parserInput - Parser input properties
 * @return transformed results
 *
 */
export const transformNominal = ({
  result,
}: {
  query?: Query;
  result: (string | number | null)[];
}) => {
  const data: Record<string, any>[] = [];
  const keys: Set<string> = new Set();

  keys.add(KEEN_VALUE);
  result.forEach((nominalValue) => {
    data.push({
      [KEEN_VALUE]: nominalValue,
    });
  });

  return {
    data,
    keys: [...keys],
  };
};
