import { ScaleTime } from 'd3-scale';
import {
  timeDay,
  timeMinute,
  timeMonth,
  timeWeek,
  timeHour,
  timeYear,
  CountableTimeInterval,
} from 'd3-time';

import { TIME_UNIT, TIME_INTERVALS } from './constants';

import { TimePrecision } from '../../types';

const timeModifier: Record<TimePrecision, CountableTimeInterval> = {
  day: timeDay,
  minute: timeMinute,
  hour: timeHour,
  week: timeWeek,
  month: timeMonth,
  year: timeYear,
};

/**
 * Calculates time axis intervals range.
 *
 * @param scale - instance of time scale
 * @return Collection of dates
 *
 */
const createTimeAxisIntervals = (
  scale: ScaleTime<number, number>,
  minimumTickWidth = 70
): { ticks: Date[]; precision: TimePrecision } => {
  const [startDimension, endDimension] = scale.range();
  const axisDimension = endDimension - startDimension;

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

  let intervalDividers = multiples.filter((value) => {
    const ms = value * TIME_UNIT[unit[0]];
    return defaultTickInterval % ms === 0;
  });

  if (intervalDividers.length === 0) {
    intervalDividers = [1];
  }

  console.log(intervalDividers, 'intervalDividers', unit[0]);

  const modifier = timeModifier[unit[0]];
  const ticksRanges = intervalDividers.map((stepRange) =>
    modifier.range(start, end, stepRange)
  );

  const tickRatio = Math.floor(axisDimension / minimumTickWidth);

  const ticks = ticksRanges.reduce((prev, curr) => {
    return Math.abs(curr.length - tickRatio) < Math.abs(prev.length - tickRatio)
      ? curr
      : prev;
  });

  console.log('possible values', tickRatio);

  // const stepRange =
  //   [...multiples].reverse().find((value) => {
  //     const ms = value * TIME_UNIT[unit[0]];
  //     return defaultTickInterval % ms === 0;
  //   }) || multiples[0];

  return {
    ticks,
    precision: unit[0],
  };
};

export default createTimeAxisIntervals;
