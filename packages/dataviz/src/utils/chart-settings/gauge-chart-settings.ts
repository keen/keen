import { GaugeChartSettings } from '@keen.io/charts';

import { VisualizationOptions } from './types';

export const setChartSettings = ({
  keys,
}: VisualizationOptions): Partial<GaugeChartSettings> => {
  const [valueKey] = keys;

  return {
    valueKey,
  };
};
