import { TimePrecision } from '@keen.io/charts-utils';
import { timeFormat } from 'd3-time-format';

const dateFormatter = timeFormat('%Y-%m-%dT%H:%M:%S');

const clearDateTime = (dateString: string) => {
  const date = new Date(dateString);
  date.setHours(0);
  date.setMinutes(0);
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
 * @param data - data series
 * @param precision - time precision
 * @return data series with converted dates
 *
 */
export const transformDates = (
  data: Record<string, any>,
  precision: TimePrecision,
  labelSelector: string
) =>
  data.map((item: Record<string, any>) => {
    return {
      ...item,
      [labelSelector]: DATE_FORMATS[precision](item[labelSelector]),
    };
  });
