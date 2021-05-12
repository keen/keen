import { Query } from '@keen.io/query';
import { convertDate } from '@keen.io/time-utils';

import { KEEN_KEY, KEEN_VALUE, KEEN_TABLE_INTERVAL } from '../../constants';
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
    query,
    result,
  }: {
    query?: Query;
    result: IntervalResult[];
  },
  { dateModifier }: ParserSettings,
  visualization?: string
) => {
  const data: Record<string, any>[] = [];
  const keys: Set<string> = new Set();
  const enableTableFormatter =
    query?.analysis_type &&
    query?.event_collection &&
    visualization === 'table';
  const tableValue =
    enableTableFormatter &&
    `${query?.analysis_type}.${query?.event_collection}`;

  result.forEach((interval) => {
    const {
      value,
      timeframe: { start: startDate },
    } = interval as {
      timeframe: { start: string; end: string };
      value: number | null | string;
    };
    keys.add(enableTableFormatter ? tableValue : KEEN_VALUE);
    data.push({
      [enableTableFormatter ? KEEN_TABLE_INTERVAL : KEEN_KEY]: convertDate(
        startDate,
        dateModifier
      ),
      [enableTableFormatter ? tableValue : KEEN_VALUE]: value,
    });
  });

  return {
    data,
    keys: [...keys],
  };
};
