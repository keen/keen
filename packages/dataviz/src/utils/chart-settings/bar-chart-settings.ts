import { BarChartSettings } from '@keen.io/charts';
import {
  getPrecisionForInterval,
  createDateFormatter,
} from '@keen.io/charts-utils';

import { extractOrderDirection } from '../query';

import { VisualizationOptions } from './types';

export const setChartSettings = ({
  query,
}: VisualizationOptions): Partial<BarChartSettings> => {
  const { interval, order_by: orderBy } = query;
  let settings = {};

  if (interval) {
    const precision = getPrecisionForInterval(interval);
    const dateFormatter = createDateFormatter(precision);

    settings = {
      ...settings,
      tooltipSettings: {
        formatTime: dateFormatter,
      },
      xScaleSettings: {
        type: 'time',
        precision,
        formatLabel: dateFormatter,
      },
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
