import { timeFormat } from 'd3-time-format';

import { DATE_FORMATS, PRECISE_DATE_FORMATS } from './constants';

import { TimePrecision } from '../../types';

/**
 * Creates date formatter based on specified precision
 *
 * @param precision - time precision
 * @param useFullTimePrecision - increase time format precision
 * @return format function
 *
 */
const createDateFormatter = (
  precision: TimePrecision,
  useFullTimePrecision = false
): ((label: string | number | Date) => string) => {
  const formatSpecifiers = useFullTimePrecision
    ? PRECISE_DATE_FORMATS
    : DATE_FORMATS;
  const format = formatSpecifiers[precision] || formatSpecifiers['month'];
  const formatTime = timeFormat(format);

  return (date: string | number | Date) => {
    if (date instanceof Date) return formatTime(date);
    return formatTime(new Date(date));
  };
};

export default createDateFormatter;
