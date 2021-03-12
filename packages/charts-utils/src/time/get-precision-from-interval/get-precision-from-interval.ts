import { isCustomInterval } from '@keen.io/query';

import {
  DEFAULT_INTERVAL,
  CUSTOM_INTERVAL_TO_PRECISION,
  INTERVAL_TO_PRECISION,
} from './constants';

import { TimePrecision } from '../../types';

/**
 * Get time precision from provided interval
 *
 * @param interval - string representing data interval
 * @return time precision
 *
 */
const getPrecisionForInterval = (interval: string): TimePrecision => {
  if (isCustomInterval(interval))
    return (
      CUSTOM_INTERVAL_TO_PRECISION[interval.split('_')[2]] || DEFAULT_INTERVAL
    );

  return INTERVAL_TO_PRECISION[interval] || DEFAULT_INTERVAL;
};

export default getPrecisionForInterval;
