import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';

dayjs.extend(utcPlugin);

/**
 * Converts date based on provided offset.
 *
 * @param utcISODate - Date UTC ISO string
 * @param offset - offset in minutes
 * @return iso date string converted by offset
 *
 */
const convertByOffset = (utcISODate: string, offset: number) => {
  try {
    const date = dayjs.utc(utcISODate);
    if (typeof offset === 'number') {
      return date.utcOffset(offset).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
    }

    return utcISODate;
  } catch (err) {
    return utcISODate;
  }
};

export default convertByOffset;
