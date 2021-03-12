import { TimePrecision } from '../../types';

export const DATE_MODIFIERS = [
  (date: Date) => date.setSeconds(0),
  (date: Date) => date.setMinutes(0),
  (date: Date) => date.setHours(0),
  (date: Date) => date.setDate(1),
  (date: Date) => date.setMonth(0),
];

export const TIME_PRECISION_MODIFIERS: Record<
  TimePrecision,
  ((date: Date) => number)[]
> = {
  minute: DATE_MODIFIERS.slice(0, 1),
  hour: DATE_MODIFIERS.slice(0, 2),
  day: DATE_MODIFIERS.slice(0, 3),
  week: DATE_MODIFIERS.slice(0, 3),
  month: DATE_MODIFIERS.slice(0, 4),
  year: DATE_MODIFIERS.slice(0, 5),
};
