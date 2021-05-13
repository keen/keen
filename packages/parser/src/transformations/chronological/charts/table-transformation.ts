import { Query } from '@keen.io/query';
import { convertDate } from '@keen.io/time-utils';

import { KEEN_TABLE_INTERVAL } from '../../../constants';
import { IntervalResult, DateModifier } from '../../../types';

/**
 * Chronological transformation dedicated for table chart
 *
 * @param query - query settings
 * @param result - categorical results
 * @param dateModifier - date modifier
 * @return transformed results
 *
 */

export const tableChartTransformation = (
  query: Pick<Query, 'analysis_type' | 'event_collection'>,
  result: IntervalResult[],
  dateModifier: DateModifier
) => {
  const data: Record<string, any>[] = [];
  const keys: Set<string> = new Set();
  const tableValue = `${query.analysis_type}.${query.event_collection}`;

  result.forEach((interval) => {
    const {
      value,
      timeframe: { start: startDate },
    } = interval as {
      timeframe: { start: string; end: string };
      value: number | null | string;
    };
    keys.add(tableValue);
    data.push({
      [KEEN_TABLE_INTERVAL]: convertDate(startDate, dateModifier),
      [tableValue]: value,
    });
  });

  return {
    data,
    keys: [...keys],
  };
};
