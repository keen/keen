import dayjs from 'dayjs';

import convertByOffset from '../convert-by-offset';
import convertByTimezone from '../convert-by-timezone';
import getOffsetFromDate from '../get-offset-from-date';

/**
 * Converts date based on provided offset or named timezone.
 *
 * @param utcISODate - date utc iso string
 * @param timezone - offset in minutes or named timezone
 * @return converted utc iso date
 *
 */
const convertDate = (utcISODate: string, timezone: string) => {
  const isDateWithTimezoneOffset = dayjs(timezone).isValid();
  if (isDateWithTimezoneOffset) {
    const offset = getOffsetFromDate(timezone);
    if (offset) return convertByOffset(utcISODate, offset);
  } else {
    return convertByTimezone(utcISODate, timezone);
  }

  return utcISODate;
};

export default convertDate;
