import { TableChartSettings } from '@keen.io/charts';
import { extractGroupBySettings } from '@keen.io/query';
import { KEEN_TABLE_INTERVAL } from '@keen.io/parser';

import { VisualizationOptions } from './types';

export const setChartSettings = ({
  query,
}: VisualizationOptions): Partial<TableChartSettings> => {
  const { property_names: propertyNames, group_by: groupBy, interval } = query;
  let settings = {};

  if (propertyNames) {
    settings = {
      ...settings,
      columnsOrder: propertyNames,
    };
  }

  if (groupBy) {
    settings = {
      ...settings,
      columnsOrder: interval
        ? [KEEN_TABLE_INTERVAL, ...extractGroupBySettings(groupBy)]
        : extractGroupBySettings(groupBy),
    };
  }

  return {
    ...settings,
  };
};
