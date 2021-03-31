import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

import { DEPRECATED_TIMEZONES } from '../contants';

/**
 * Get default absolute timeframe for timezone
 *
 * @param utcISODate - Date UTC ISO string
 * @param timezone - named timezone
 * @return iso date string converted with timezone offset
 *
 */
export const getDefaultAbsoluteTime = (timezoneName: string) => {
  try {
    const timezone = DEPRECATED_TIMEZONES[timezoneName] || timezoneName;
    const offset = dayjs().utc().tz(timezone).utcOffset();
    const start = dayjs
      .utc()
      .subtract(1, 'day')
      .startOf('day')
      .utcOffset(offset, true)
      .format();

    const end = dayjs().startOf('day').utcOffset(offset, true).format();

    return {
      start,
      end,
    };
  } catch (err) {
    return null;
  }
};

export default getDefaultAbsoluteTime;
