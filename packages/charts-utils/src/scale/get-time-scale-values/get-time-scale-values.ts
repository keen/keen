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

import { TimePrecision, ScaleSettings } from '../../types';

const timeModifier: Record<TimePrecision, CountableTimeInterval> = {
  day: timeDay,
  minute: timeMinute,
  hour: timeHour,
  week: timeWeek,
  month: timeMonth,
  year: timeYear,
};

/**
 * Calculates values of time based on defined precision.
 *
 * @param scale - time scale
 * @param settings - scale settings
 * @return Collection of dates
 *
 */
const getTimeScaleValues = (
  scale: ScaleTime<number, number>,
  { precision }: ScaleSettings
) => {
  const [startDate, endDate] = scale.domain() as Date[];
  const ticks = timeModifier[precision].count(startDate, endDate);
  return scale.ticks(ticks);
};

export default getTimeScaleValues;
