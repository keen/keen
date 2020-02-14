import { TimePrecision } from '@keen.io/charts';

const INTERVAL_TO_PRECISION: Record<string, TimePrecision> = {
  minutely: 'minute',
  hourly: 'hour',
  daily: 'day',
  weekly: 'week',
  monthly: 'month',
  yearly: 'year',
};

export const getPrecisionForInterval = (interval: string): TimePrecision =>
  INTERVAL_TO_PRECISION[interval] || 'month';
