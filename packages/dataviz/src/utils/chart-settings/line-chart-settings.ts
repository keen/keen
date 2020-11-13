import { LineChartSettings } from '@keen.io/charts';
import { createScaleSettings } from '@keen.io/charts-utils';

import { VisualizationOptions } from './types';

export const setChartSettings = ({
  query,
}: VisualizationOptions): Partial<LineChartSettings> => {
  const { interval } = query;
  let settings = {};

  if (interval) {
    settings = {
      ...settings,
      xScaleSettings: {
        type: 'time',
        ...createScaleSettings(interval),
      },
    };
  }

  return settings;
};
