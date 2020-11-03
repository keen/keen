import { ChoroplethChartSettings } from '@keen.io/charts';
import { KEEN_KEY } from '@keen.io/parser';

import { VisualizationOptions } from './types';

export const setChartSettings = ({
  keys,
}: VisualizationOptions): Partial<ChoroplethChartSettings> => {
  const [valueKey] = keys;

  return {
    geoKey: KEEN_KEY,
    valueKey,
  };
};
