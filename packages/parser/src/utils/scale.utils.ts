import { ScaleSettings } from '@keen.io/charts-utils';

import { getPrecisionForInterval } from './time.utils';
import { createLabelFormatter } from './date.utils';

import { Query } from '../types';

export const createScaleSettings = ({
  interval,
}: Query): Partial<ScaleSettings> => {
  if (interval) {
    const precision = getPrecisionForInterval(interval);
    const formatLabel = createLabelFormatter(precision);

    return {
      precision,
      formatLabel,
    };
  }

  return {};
};
