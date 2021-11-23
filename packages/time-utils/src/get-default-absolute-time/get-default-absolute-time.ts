import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';

dayjs.extend(utcPlugin);

import { ABSOLUTE_TIME_FORMAT } from '../contants';

/**
 * Get default absolute timeframe for timezone
 *
 * @param utcISODate - Date UTC ISO string
 * @param timezone - named timezone
 * @return iso date string converted with timezone offset
 *
 */
export const getDefaultAbsoluteTime = () => {
  try {
    const start = dayjs
      .utc()
      .subtract(1, 'day')
      .startOf('day')
      .format(ABSOLUTE_TIME_FORMAT);
    const end = dayjs().startOf('day').format(ABSOLUTE_TIME_FORMAT);

    return {
      start,
      end,
    };
  } catch (err) {
    return null;
  }
};

export default getDefaultAbsoluteTime;
