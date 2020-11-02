import { BarChartSettings } from '@keen.io/charts';
import { createScaleSettings } from '@keen.io/parser';

import { VisualizationOptions } from './types';

export const setChartSettings = ({
  query,
}: VisualizationOptions): Partial<BarChartSettings> => {
  const { interval } = query;
  let settings = {};

  if (interval) {
    settings = {
      ...settings,
      xScaleSettings: { type: 'band', ...createScaleSettings(query) },
    };
  }

  return settings;
};
