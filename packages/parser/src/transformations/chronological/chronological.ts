import { Query } from '@keen.io/query';
import { convertDate } from '@keen.io/time-utils';

import { KEEN_KEY, KEEN_VALUE } from '../../constants';
import { ParserSettings, IntervalResult } from '../../types';

/**
 * Transforms chronological results.
 *
 * @param parserInput - Parser input properties
 * @return transformed results
 *
 */
export const transformChronological = (
  {
    result,
  }: {
    query?: Query;
    result: IntervalResult[];
  },
  { dateModifier }: ParserSettings
) => {
  const data: Record<string, any>[] = [];
  const keys: Set<string> = new Set();

  result.forEach((interval) => {
    const {
      value,
      timeframe: { start: startDate },
    } = interval as {
      timeframe: { start: string; end: string };
      value: number | null | string;
    };
    keys.add(KEEN_VALUE);
    data.push({
      [KEEN_KEY]: convertDate(startDate, dateModifier),
      [KEEN_VALUE]: value,
    });
  });

  return {
    data,
    keys: [...keys],
  };
};
