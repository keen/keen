import { LineChartSettings } from '@keen.io/charts';
import {
  getPrecisionForInterval,
  createDateFormatter,
} from '@keen.io/charts-utils';

import { VisualizationOptions } from './types';

export const setChartSettings = ({
  query,
}: VisualizationOptions): Partial<LineChartSettings> => {
  const { interval } = query;
  let settings = {};

  if (interval) {
    const precision = getPrecisionForInterval(interval);
    settings = {
      ...settings,
      tooltipSettings: {
        formatTime: createDateFormatter(precision),
      },
      xScaleSettings: {
        type: 'time',
        precision,
      },
    };
  }

  return settings;
};
