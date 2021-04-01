import dayjs from 'dayjs';

import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

import { DEPRECATED_TIMEZONES, INVALID_DATE } from '../contants';

/**
 * Formats date based on provided pattern.
 *
 * @param utcISODate - date utc iso string
 * @param timezoneName - timezone name
 * @param formatPattern - date format pattern
 * @return formatted date string
 *
 */
export const formatDate = (
  utcISODate: string,
  timezoneName: string,
  formatPattern = 'YYYY-MM-DD HH:mm'
) => {
  try {
    const timezone = DEPRECATED_TIMEZONES[timezoneName] || timezoneName;
    return dayjs.utc(utcISODate).tz(timezone).format(formatPattern);
  } catch (err) {
    return INVALID_DATE;
  }
};

export default formatDate;
