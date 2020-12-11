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

import { TimePrecision, ScaleSettings } from '../../types';

const timeModifier: Record<TimePrecision, CountableTimeInterval[]> = {
  day: [timeDay, utcDay],
  minute: [timeMinute, utcMinute],
  hour: [timeHour, utcHour],
  week: [timeWeek, utcWeek],
  month: [timeMonth, utcMonth],
  year: [timeYear, utcYear],
};

/**
 * Calculates values of time scale based on defined precision.
 *
 * @param scale - time scale
 * @param settings - scale settings
 * @return Collection of dates
 *
 */
const getTimeScaleValues = (
  scale: ScaleTime<number, number>,
  { precision, stepRange }: ScaleSettings,
  useUTC = false
) => {
  const [firstDate, lastDate] = scale.domain() as Date[];
  const modifier = timeModifier[precision][useUTC ? 1 : 0];

  return [...modifier.range(firstDate, lastDate, stepRange), lastDate];
};

export default getTimeScaleValues;
