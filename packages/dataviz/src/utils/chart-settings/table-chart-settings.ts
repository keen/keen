import { TableChartSettings } from '@keen.io/charts';
import { extractGroupBySettings } from '@keen.io/query';
import { colors } from '@keen.io/colors';

import { VisualizationOptions } from './types';

export const setChartSettings = ({
  query,
}: VisualizationOptions): Partial<TableChartSettings> => {
  const { property_names: propertyNames, group_by: groupBy } = query;
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
      columnsOrder: extractGroupBySettings(groupBy),
    };
  }

  return {
    ...settings,
    color: colors.blue[500],
  };
};
