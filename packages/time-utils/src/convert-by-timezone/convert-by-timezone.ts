import dayjs from 'dayjs';

import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

import { DEPRECATED_TIMEZONES } from '../contants';

/**
 * Converts date based on provided named timezone.
 *
 * @param utcISODate - Date UTC ISO string
 * @param timezone - named timezone
 * @return iso date string converted to timezone
 *
 */
const convertByTimezone = (utcISODate: string, timezoneName = 'UTC') => {
  try {
    const timezone = DEPRECATED_TIMEZONES[timezoneName] || timezoneName;
    return (
      dayjs.utc(utcISODate).tz(timezone).format('YYYY-MM-DDTHH:mm:ss.SSS') + `Z`
    );
  } catch (err) {
    return utcISODate;
  }
};

export default convertByTimezone;
