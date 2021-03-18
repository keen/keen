import { timeParse } from 'd3-time-format';

import { TIME_PRECISION_MODIFIERS } from './constants';

import { TimePrecision } from '../../types';

/**
 * Normalize date based on local browser timezone or UTC
 *
 * @param date - date string in ISO format
 * @param precision - time precision
 * @param format - date parse format
 * @return normalized date
 *
 */
export const normalizeDate = (
  date: string,
  precision: TimePrecision = 'month',
  format = '%Y-%m-%dT%H:%M:%S.%LZ'
) => {
  const parseTime = timeParse(format);
  const parsedDate = parseTime(date);

  const dateModifiers = TIME_PRECISION_MODIFIERS[precision];
  dateModifiers.forEach((fn) => fn(parsedDate));

  return parsedDate;
};

export default normalizeDate;
