import createLabelFormatter from '../create-label-formatter';
import { getPrecisionForInterval } from '../../time';

import { ScaleSettings } from '../../types';

/**
 * Creates scale settings with labels formatter
 *
 * @param interval - time interval
 * @return scale settings
 *
 */
const createScaleSettings = (interval: string): Partial<ScaleSettings> => {
  const precision = getPrecisionForInterval(interval);
  const formatLabel = createLabelFormatter(precision);

  return {
    precision,
    formatLabel,
  };
};

export default createScaleSettings;
