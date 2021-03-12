import { ScaleTime } from 'd3-scale';
import {
  timeDay,
  utcDay,
  timeMinute,
  utcMinute,
  timeMonth,
  utcMonth,
  utcWeek,
  timeWeek,
  timeHour,
  utcHour,
  timeYear,
  utcYear,
  CountableTimeInterval,
} from 'd3-time';

import { TIME_UNIT, TIME_INTERVALS } from './constants';

import { TimePrecision } from '../../types';

const timeModifier: Record<TimePrecision, CountableTimeInterval[]> = {
  day: [timeDay, utcDay],
  minute: [timeMinute, utcMinute],
  hour: [timeHour, utcHour],
  week: [timeWeek, utcWeek],
  month: [timeMonth, utcMonth],
  year: [timeYear, utcYear],
};

/**
 * Calculates time axis intervals range.
 *
 * @param scale - instance of time scale
 * @return Collection of dates
 *
 */
const createTimeAxisIntervals = (
  scale: ScaleTime<number, number>
): { ticks: Date[]; precision: TimePrecision } => {
  const [start, end] = scale.domain();
  const defaultTickInterval = end.getTime() - start.getTime();

  let unit = TIME_INTERVALS[TIME_INTERVALS.length - 1],
    interval = TIME_UNIT[unit[0]],
    multiples = unit[1],
    i;

  for (i = 0; i < TIME_INTERVALS.length; i++) {
    unit = TIME_INTERVALS[i];
    interval = TIME_UNIT[unit[0]];
    multiples = unit[1];

    if (TIME_INTERVALS[i + 1]) {
      const newInterval =
        interval * (multiples as any)[(multiples as any).length - 1] +
        TIME_UNIT[TIME_INTERVALS[i + 1][0]];

      if (defaultTickInterval <= newInterval) {
        break;
      }
    }
  }

  const stepRange =
    [...multiples].reverse().find((value) => {
      const ms = value * TIME_UNIT[unit[0]];
      return defaultTickInterval % ms === 0;
    }) || multiples[0];
  const modifier = timeModifier[unit[0]][0];

  return {
    ticks: [...modifier.range(start, end, stepRange)],
    precision: unit[0],
  };
};

export default createTimeAxisIntervals;
