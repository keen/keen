import { HeatmapChartSettings } from '@keen.io/charts';
import {
  getPrecisionForInterval,
  createDateFormatter,
} from '@keen.io/charts-utils';

import { VisualizationOptions } from './types';

export const setChartSettings = ({
  query,
}: VisualizationOptions): Partial<HeatmapChartSettings> => {
  const { interval } = query;
  let settings = {};

  if (interval) {
    const precision = getPrecisionForInterval(interval);

    settings = {
      ...settings,
      yScaleSettings: {
        precision,
        type: 'time',
        formatLabel: createDateFormatter(precision),
      },
    };
  }

  return settings;
};
