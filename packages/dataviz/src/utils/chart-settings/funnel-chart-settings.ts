import { FunnelChartSettings } from '@keen.io/charts';

import { VisualizationOptions } from './types';

export const setChartSettings = ({
  keys,
}: VisualizationOptions): Partial<FunnelChartSettings> => {
  const [valueKey] = keys;

  return {
    valueKey,
  };
};
