import { convertDate } from '@keen.io/time-utils';

import { KEEN_KEY, KEEN_VALUE } from '../../constants';
import { IntervalResult, DateModifier } from '../../types';

/**
 * Default chronological transformation
 *
 * @param result - categorical results
 * @param dateModifier - date modifier
 * @return transformed results
 *
 */

export const defaultTransformation = (
  result: IntervalResult[],
  dateModifier: DateModifier
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
