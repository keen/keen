import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';

import getOffsetFromDate from '../get-offset-from-date';

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

import { DEPRECATED_TIMEZONES, DEFAULT_TIMEZONE } from '../contants';

/**
 * Change date timezone offset without modyfing time.
 *
 * @param utcISODate - Date UTC ISO string
 * @param timezone - named timezone
 * @return iso date string with timezone offset
 *
 */
const setTimezoneOffset = (utcISODate: string, timezoneName: string) => {
  try {
    const timezone = DEPRECATED_TIMEZONES[timezoneName] || timezoneName;
    const currentOffset = getOffsetFromDate(utcISODate);
    let date;

    if (timezoneName === DEFAULT_TIMEZONE) {
      date = dayjs(utcISODate).utc(true).utcOffset(currentOffset);
    } else {
      date = dayjs.utc(utcISODate).utcOffset(currentOffset);
    }

    return date.tz(timezone, true).format();
  } catch (err) {
    return utcISODate;
  }
};

export default setTimezoneOffset;
