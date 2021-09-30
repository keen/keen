import { formatValue as valueFormatter } from '@keen.io/charts-utils';
import { TableChartSettings } from '@keen.io/charts';
import { extractGroupBySettings } from '@keen.io/query';
import { KEEN_TABLE_INTERVAL } from '@keen.io/parser';

import { TransformationInput } from '../../types';

export const transform = ({
  query,
  chartSettings,
}: TransformationInput<TableChartSettings>) => {
  const { data } = chartSettings;
  const { property_names: propertyNames, group_by: groupBy, interval } = query;

  let columnsOrder: string[] = null;
  const columnsRename = chartSettings.columnsNamesMapping
    ? chartSettings.columnsNamesMapping
    : null;
  const columnsFormatters = chartSettings.formatValue
    ? chartSettings.formatValue
    : {};

  if (propertyNames) {
    columnsOrder = propertyNames;
  } else if (groupBy && !interval) {
    columnsOrder = extractGroupBySettings(groupBy);
  } else if (interval) {
    columnsOrder = [KEEN_TABLE_INTERVAL];
  }

  const [firstRecord] = data;
  const columns = Object.keys(firstRecord).sort((a, b) => {
    if (columnsOrder.includes(a)) {
      return -1;
    }
    if (columnsOrder.includes(b)) {
      return 1;
    }
    return 0;
  });

  const renamedColumns = columnsRename
    ? columns.map((columnName) =>
        columnsRename[columnName] ? columnsRename[columnName] : columnName
      )
    : columns;

  return [
    renamedColumns,
    ...data.map((item) =>
      columns.map((columnName) =>
        columnsFormatters[columnName]
          ? valueFormatter(item[columnName], columnsFormatters[columnName])
          : item[columnName]
      )
    ),
  ];
};
