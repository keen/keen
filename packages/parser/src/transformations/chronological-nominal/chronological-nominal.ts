import { Query, Timeframe } from '@keen.io/query';

import { KEEN_KEY, KEEN_VALUE } from '../../constants';

import { IntervalResult } from '../../types';

/**
 * Transforms nominal data in chronological order.
 *
 * @param parserInput - Parser input properties
 * @return transformed results
 *
 */
export const transformChronologicalNominal = ({
  result,
}: {
  query?: Query;
  result: IntervalResult[];
}) => {
  const data: Record<string, any>[] = [];
  const keys: Set<string> = new Set();

  keys.add(KEEN_VALUE);

  result.map((interval) => {
    const {
      timeframe: { start },
      value,
    } = interval as { timeframe: Timeframe; value: string[] | number[] };
    data.push({
      [KEEN_KEY]: start,
      [KEEN_VALUE]: value,
    });
  });

  return {
    data,
    keys: [...keys],
  };
};
