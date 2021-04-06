import convertByOffset from '../convert-by-offset';
import convertByTimezone from '../convert-by-timezone';

import { DEFAULT_TIMEZONES } from '../contants';

/**
 * Converts date based on provided offset in minutes or named timezone.
 *
 * @param utcISODate - date utc iso string
 * @param timezone - offset in minutes or named timezone
 * @return converted utc iso date
 *
 */
const convertDate = (utcISODate: string, timezone: string | number) => {
  if (typeof timezone === 'number' && timezone !== 0) {
    return convertByOffset(utcISODate, timezone);
  } else if (
    typeof timezone === 'string' &&
    !DEFAULT_TIMEZONES.includes(timezone)
  ) {
    return convertByTimezone(utcISODate, timezone);
  }

  return utcISODate;
};

export default convertDate;
