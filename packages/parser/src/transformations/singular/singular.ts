import { Query } from '@keen.io/query';

import { DEFAULT_NAME, KEEN_KEY, KEEN_VALUE } from '../../constants';

/**
 * Transforms singular data.
 *
 * @param parserInput - Parser input properties
 * @return transformed singular results
 *
 */
export const transformSingular = ({
  result,
}: {
  query?: Query;
  result: number;
}) => {
  const value = result === null ? 0 : result;
  return {
    data: [{ [KEEN_KEY]: DEFAULT_NAME, [KEEN_VALUE]: value }],
    keys: [KEEN_VALUE],
  };
};
