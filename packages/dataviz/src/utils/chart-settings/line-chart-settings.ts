import { LineChartSettings } from '@keen.io/charts';

import {
  getPrecisionForInterval,
  createDateFormatter,
} from '@keen.io/charts-utils';

import { VisualizationOptions } from './types';

export const setChartSettings = ({
  query,
  componentSettings,
}: VisualizationOptions): Partial<LineChartSettings> => {
  const { interval } = query;
  let settings = {};

  const lineChartSettings = componentSettings as LineChartSettings;

  if (lineChartSettings.stackMode === 'percent') {
    settings = {
      yScaleSettings: {
        formatLabel: '${}%',
      },
    };
  }

  if (interval) {
    const precision = getPrecisionForInterval(interval);
    settings = {
      ...settings,
      tooltipSettings: {
        formatTime: createDateFormatter(precision, true),
      },
      xScaleSettings: {
        type: 'time',
        precision,
      },
    };
  }

  return settings;
};
