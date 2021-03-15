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
 * Calculates intervals range for time scale.
 *
 * @param scale - instance of time scale
 * @return Collection of dates
 *
 */
const createTimeIntervals = (
  scale: ScaleTime<number, number>,
  minimumTickWidth = 70
): { ticks: Date[]; precision: TimePrecision } => {
  const [startDimension, endDimension] = scale.range();
  const axisDimension = endDimension - startDimension;

  const [start, end] = scale.domain();
  const defaultTickInterval = end.getTime() - start.getTime();

  let unit = TIME_INTERVALS[TIME_INTERVALS.length - 1],
    interval = TIME_UNIT[unit[0]],
    multiples = unit[1];

  TIME_INTERVALS.some((timeIntervalUnit, i) => {
    const [intervalUnit, intervalMultiples] = timeIntervalUnit;
    unit = timeIntervalUnit;
    interval = TIME_UNIT[intervalUnit];
    multiples = intervalMultiples;

    if (TIME_INTERVALS[i + 1]) {
      const newInterval =
        interval * multiples[multiples.length - 1] +
        TIME_UNIT[TIME_INTERVALS[i + 1][0]];

      return defaultTickInterval <= newInterval;
    }
  });

  let intervalDividers = multiples.filter((value) => {
    const ms = value * TIME_UNIT[unit[0]];
    return Math.round(defaultTickInterval / ms);
  });

  if (intervalDividers.length === 0) {
    intervalDividers = [1];
  }

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

  return {
    ticks,
    precision: unit[0],
  };
};

export default createTimeIntervals;
