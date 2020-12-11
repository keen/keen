import { timeFormat } from 'd3-time-format';
import { TimePrecision } from '@keen.io/charts-utils';

const dateFormatter = timeFormat('%Y-%m-%dT%H:%M:%S');

const clearDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return dateFormatter(date);
};

const DATE_FORMATS: Record<TimePrecision, any> = {
  day: clearDateTime,
  hour: (date: string) => date,
  minute: (date: string) => date,
  week: clearDateTime,
  month: clearDateTime,
  year: clearDateTime,
};

/**
 * Provides time conversion to handle all dates
 * as localized browser's timezone by default
 *
 * @param date - date
 * @param interval - interval time precision
 * @return localized date
 *
 */
export const localizeDate = (date: string, precision: TimePrecision) =>
  DATE_FORMATS[precision](date);
