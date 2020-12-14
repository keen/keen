import { isCustomInterval } from '@keen.io/query';

import createLabelFormatter from '../create-label-formatter';
import { getPrecisionForInterval, getStepsFromInterval } from '../../time';

import { ScaleSettings } from '../../types';

/**
 * Creates scale settings with labels formatter
 *
 * @param interval - time interval
 * @return scale settings
 *
 */
const createScaleSettings = (interval: string): Partial<ScaleSettings> => {
  const customInterval = isCustomInterval(interval);
  const precision = getPrecisionForInterval(interval);

  return {
    precision,
    formatLabel: createLabelFormatter(precision),
    stepRange: customInterval ? getStepsFromInterval(interval) : undefined,
  };
};

export default createScaleSettings;
