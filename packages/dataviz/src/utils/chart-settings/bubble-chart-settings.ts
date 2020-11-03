import { BubbleChartSettings } from '@keen.io/charts';

import { VisualizationOptions } from './types';

export const setChartSettings = ({
  keys,
}: VisualizationOptions): Partial<BubbleChartSettings> => {
  const [xDomainKey, yDomainKey, valueKey] = keys;

  return {
    xDomainKey,
    yDomainKey,
    valueKey,
  };
};
