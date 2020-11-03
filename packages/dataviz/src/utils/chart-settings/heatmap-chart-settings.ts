import { HeatmapChartSettings } from '@keen.io/charts';
import { createScaleSettings } from '@keen.io/parser';

import { VisualizationOptions } from './types';

export const setChartSettings = ({
  query,
}: VisualizationOptions): Partial<HeatmapChartSettings> => {
  const { interval } = query;
  let settings = {};

  if (interval) {
    settings = {
      ...settings,
      yScaleSettings: { type: 'band', ...createScaleSettings(query) },
    };
  }

  return settings;
};
