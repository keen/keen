import { ScaleTime } from 'd3-scale';
import {
  timeDays,
  timeYears,
  timeHours,
  timeMonths,
  timeMinutes,
  timeWeeks,
} from 'd3-time';

import { TimePrecision, ScaleSettings } from '../../types';

const timeModifier: Record<TimePrecision, any> = {
  day: timeDays,
  minute: timeMinutes,
  hour: timeHours,
  week: timeWeeks,
  month: timeMonths,
  year: timeYears,
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

  console.log(precision, 'llala');

  const ticks = timeModifier[precision](startDate, endDate, 10);

  console.log('tiki bobasa', ticks);

  return ticks;
};

export default getTimeScaleValues;
