import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';

import getOffsetFromDate from '../get-offset-from-date';

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

import { DEPRECATED_TIMEZONES, DEFAULT_TIMEZONES } from '../contants';

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

    const utcDate =
      dayjs
        .utc(utcISODate)
        .utcOffset(currentOffset)
        .format('YYYY-MM-DDTHH:mm:ss') + `Z`;

    if (DEFAULT_TIMEZONES.includes(timezone)) {
      return utcDate;
    } else {
      const date = dayjs.utc(utcDate);

      return date
        .tz(timezone, false)
        .date(date.date())
        .month(date.month())
        .year(date.year())
        .hour(date.hour())
        .minute(date.minute())
        .second(date.second())
        .format();
    }
  } catch (err) {
    return utcISODate;
  }
};

export default setTimezoneOffset;
