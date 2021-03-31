import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

import { DEPRECATED_TIMEZONES } from '../contants';

/**
 * Converts date based on provided timezone.
 *
 * @param utcISODate - Date UTC ISO string
 * @param timezone - named timezone
 * @return iso date string converted with timezone offset
 *
 */
const setTimezoneOffset = (utcISODate: string, timezoneName: string) => {
  try {
    const timezone = DEPRECATED_TIMEZONES[timezoneName] || timezoneName;
    return dayjs.utc(utcISODate).tz(timezone).format('YYYY-MM-DDTHH:mm:ssZ');
  } catch (err) {
    return utcISODate;
  }
};

export default setTimezoneOffset;
