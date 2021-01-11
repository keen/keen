import { utcParse, timeParse } from 'd3-time-format';

import { TimePrecision } from '../../types';

export const DATE_MODIFIERS = [
  (date: Date) => date.setSeconds(0),
  (date: Date) => date.setMinutes(0),
  (date: Date) => date.setHours(0),
  (date: Date) => date.setDate(1),
  (date: Date) => date.setMonth(0),
];

export const TIME_PRECISION_MODIFIERS: Record<
  TimePrecision,
  ((date: Date) => number)[]
> = {
  minute: DATE_MODIFIERS.slice(0, 1),
  hour: DATE_MODIFIERS.slice(0, 2),
  day: DATE_MODIFIERS.slice(0, 3),
  week: DATE_MODIFIERS.slice(0, 3),
  month: DATE_MODIFIERS.slice(0, 4),
  year: DATE_MODIFIERS.slice(0, 5),
};

/**
 * Normalize date based on local browser timezone or UTC
 *
 * @param date - date in ISO format
 * @param precision - time precision
 * @param useUTC - parse time as UTC indicator
 * @param format - data format
 * @return localized date
 *
 */
export const normalizeDate = (
  date: string,
  precision: TimePrecision = 'month',
  useUTC = false,
  format = '%Y-%m-%dT%H:%M:%S.%LZ'
) => {
  const parseTime = useUTC ? utcParse(format) : timeParse(format);
  const parsedDate = parseTime(date);

  const dateModifiers = TIME_PRECISION_MODIFIERS[precision];
  dateModifiers.forEach((fn) => fn(parsedDate));

  return parsedDate;
};

export default normalizeDate;
