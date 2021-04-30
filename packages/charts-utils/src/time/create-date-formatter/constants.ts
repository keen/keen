import { TimePrecision } from '../../types';

export const DATE_FORMATS: Record<TimePrecision, string> = {
  minute: '%I:%M %p',
  hour: '%I:%M %p',
  day: '%e %b %y',
  week: '%d %a',
  month: '%b %y',
  year: '%Y',
};

export const PRECISE_DATE_FORMATS: Record<TimePrecision, string> = {
  minute: '%Y %b %d %I:%M %p',
  hour: '%Y %b %d %I:%M %p',
  day: '%Y %b %d',
  week: '%Y %b %d',
  month: '%Y %b',
  year: '%Y',
};
