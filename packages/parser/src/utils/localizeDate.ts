import { Intervals } from '../types';
import { timeFormat } from 'd3-time-format';

const dateFormatter = timeFormat('%Y-%m-%dT%H:%M:%S');

const clearDateTime = (dateString: string) => {
  const date = new Date(dateString);
  date.setHours(0);
  date.setMinutes(0);
  return dateFormatter(date);
};

const DATE_FORMATS: Record<Intervals, any> = {
  daily: clearDateTime,
  hourly: (date: string) => date,
  minutely: (date: string) => date,
  weekly: clearDateTime,
  monthly: clearDateTime,
  yearly: clearDateTime,
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
export const localizeDate = (date: string, interval: Intervals) =>
  DATE_FORMATS[interval](date);
