import { ScaleSettings } from '@keen.io/charts-utils';

import { getPrecisionForInterval } from './time.utils';
import { createLabelFormatter } from './date.utils';

export const createScaleSettings = (
  interval: string
): Partial<ScaleSettings> => {
  const precision = getPrecisionForInterval(interval);
  const formatLabel = createLabelFormatter(precision);

  return {
    precision,
    formatLabel,
  };
};
