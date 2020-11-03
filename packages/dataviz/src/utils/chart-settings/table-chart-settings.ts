import { TableChartSettings } from '@keen.io/charts';
import { colors } from '@keen.io/colors';

import { VisualizationOptions } from './types';

export const setChartSettings = ({
  query,
}: VisualizationOptions): Partial<TableChartSettings> => {
  const { property_names: propertyNames } = query;
  let settings = {};

  if (propertyNames) {
    settings = {
      ...settings,
      columnsOrder: propertyNames,
    };
  }

  return {
    ...settings,
    color: colors.blue[500],
  };
};
