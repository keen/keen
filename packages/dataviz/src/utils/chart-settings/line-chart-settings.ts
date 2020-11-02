import { LineChartSettings } from '@keen.io/charts';
import { createScaleSettings } from '@keen.io/parser';

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
        ...createScaleSettings(query),
      },
    };
  }

  return settings;
};
