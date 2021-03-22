import { Timeframe } from '@keen.io/query';

import convertByOffset from '../convert-by-offset';
import convertByTimezone from '../convert-by-timezone';
import getOffsetFromDate from '../get-offset-from-date';

type DateWithOffset = Exclude<Timeframe, 'string'>;

const convertDate = (utcISODate: string, timezone: DateWithOffset | string) => {
  if (typeof timezone === 'string') {
    return convertByTimezone(utcISODate, timezone);
  }

  if (typeof timezone === 'object' && 'start' in timezone) {
    const { start } = timezone;
    const offset = getOffsetFromDate(start);
    if (offset) return convertByOffset(utcISODate, offset);
  }

  return utcISODate;
};

export default convertDate;
