import { BarChartSettings } from '@keen.io/charts';
import { createScaleSettings } from '@keen.io/charts-utils';
import { extractOrderDirection } from '@keen.io/parser';

import { VisualizationOptions } from './types';

export const setChartSettings = ({
  query,
}: VisualizationOptions): Partial<BarChartSettings> => {
  const { interval, order_by: orderBy } = query;
  let settings = {};

  if (interval) {
    settings = {
      ...settings,
      xScaleSettings: { type: 'band', ...createScaleSettings(interval) },
    };
  }

  if (orderBy) {
    settings = {
      ...settings,
      barsOrder: extractOrderDirection(orderBy),
    };
  }

  return settings;
};
