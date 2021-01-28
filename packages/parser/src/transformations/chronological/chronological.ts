import { Query, Timeframe } from '@keen.io/query';

import { KEEN_KEY, KEEN_VALUE } from '../../constants';
import { IntervalResult } from '../../types';

/**
 * Transforms chronological results.
 *
 * @param parserInput - Parser input properties
 * @return transformed results
 *
 */
export const transformChronological = ({
  result,
}: {
  query?: Query;
  result: IntervalResult[];
}) => {
  const data: Record<string, any>[] = [];
  const keys: Set<string> = new Set();

  result.forEach((interval) => {
    const {
      value,
      timeframe: { start: startDate },
    } = interval as {
      timeframe: Timeframe;
      value: number | null | string;
    };
    keys.add(KEEN_VALUE);
    data.push({
      [KEEN_KEY]: startDate,
      [KEEN_VALUE]: value,
    });
  });

  return {
    data,
    keys: [...keys],
  };
};
