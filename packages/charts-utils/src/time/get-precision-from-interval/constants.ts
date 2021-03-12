import { TimePrecision } from '../../types';

export const INTERVAL_TO_PRECISION: Record<string, TimePrecision> = {
  minutely: 'minute',
  hourly: 'hour',
  daily: 'day',
  weekly: 'week',
  monthly: 'month',
  yearly: 'year',
};

export const CUSTOM_INTERVAL_TO_PRECISION: Record<string, TimePrecision> = {
  minutes: 'minute',
  hours: 'hour',
  days: 'day',
  weeks: 'week',
  months: 'month',
  years: 'year',
};

export const DEFAULT_INTERVAL = 'month';
