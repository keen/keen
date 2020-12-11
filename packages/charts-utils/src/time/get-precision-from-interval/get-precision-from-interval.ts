import { TimePrecision } from '../../types';

const INTERVAL_TO_PRECISION: Record<string, TimePrecision> = {
  minutely: 'minute',
  hourly: 'hour',
  daily: 'day',
  weekly: 'week',
  monthly: 'month',
  yearly: 'year',
};

const CUSTOM_INTERVAL_TO_PRECISION: Record<string, TimePrecision> = {
  minutes: 'minute',
  hours: 'hour',
  days: 'day',
  weeks: 'week',
  months: 'month',
  years: 'year',
};

const isCustomInterval = (interval: string): boolean =>
  interval.includes('every');

const DEFAULT_INTERVAL = 'month';

const getPrecisionForInterval = (interval: string): TimePrecision => {
  console.log(interval, 'lalala');

  if (isCustomInterval(interval))
    return (
      CUSTOM_INTERVAL_TO_PRECISION[interval.split('_')[2]] || DEFAULT_INTERVAL
    );

  return INTERVAL_TO_PRECISION[interval] || DEFAULT_INTERVAL;
};

export default getPrecisionForInterval;
