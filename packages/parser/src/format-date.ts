import { timeFormat } from 'd3-time-format';

import { Query, Intervals } from './types';

const DATE_FORMATS: Record<Intervals, string> = {
  minutely: '%I:%M:%S %p',
  hourly: '%I:%M %p',
  daily: '%a %b, %Y',
  weekly: '%A %b, %Y',
  monthly: '%b, %Y',
  yearly: '%b, %Y',
};

const MS_TIME_UNITS = {
  HOUR: 3600000,
  DAY: 86400000,
  MONTH: 2419200000,
};

const calculateDateInterval = ({
  start,
  end,
}: {
  start: string;
  end: string;
}): Intervals => {
  const msDiff = Math.abs(new Date(start).getTime() - new Date(end).getTime());
  if (msDiff >= MS_TIME_UNITS.MONTH) {
    return 'monthly';
  } else if (msDiff >= MS_TIME_UNITS.DAY) {
    return 'daily';
  } else if (msDiff >= MS_TIME_UNITS.HOUR) {
    return 'hourly';
  } else {
    return 'minutely';
  }
};

export const createDateFormatter = (
  { interval }: Query,
  timeframe: { start: string; end: string }
): ((label: string | number) => string | number) => {
  const format =
    DATE_FORMATS[(interval as Intervals) || calculateDateInterval(timeframe)];
  const formatTime = timeFormat(format);
  return (date: string | number) => formatTime(new Date(date));
};
