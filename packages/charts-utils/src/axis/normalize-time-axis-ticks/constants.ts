import { TimePrecision } from '../../types';

export const TIME_UNIT: Record<TimePrecision, number> = {
  day: 24 * 3600000,
  minute: 60000,
  hour: 3600000,
  week: 7 * 24 * 3600000,
  month: 28 * 24 * 3600000,
  year: 364 * 24 * 3600000,
};

export const TIME_INTERVALS: Array<[TimePrecision, Array<number>]> = [
  ['minute', [1, 2, 5, 10, 15, 30]],
  ['hour', [1, 2, 4, 6, 8, 12]],
  ['day', [1, 2]],
  ['week', [1, 2]],
  ['month', [1, 2, 3, 4, 6]],
  ['year', [1]],
];
