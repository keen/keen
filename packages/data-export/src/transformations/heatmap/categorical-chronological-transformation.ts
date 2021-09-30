import {
  formatValue as valueFormatter,
  Formatter,
} from '@keen.io/charts-utils';
import { KEEN_KEY, KEEN_TABLE_INTERVAL } from '@keen.io/parser';

import { COLUMN_JOIN, VALUE } from '../../constants';

/**
 * Chronological transformation with categories for heatmap chart
 *
 * @param data - data series
 * @param keys - keys selectors
 * @param formatValue - value formatter
 * @param dataSeriesGroups - groups with categories
 * @return transformed structure
 */
export const categoricalChronologicalTransformation = (
  data: Record<string, any>,
  keys: string[],
  formatValue: Formatter,
  dataSeriesGroups: string[]
) => {
  const columns = [
    KEEN_TABLE_INTERVAL,
    dataSeriesGroups.join(COLUMN_JOIN),
    VALUE,
  ];
  const rows: any[] = [];

  data.forEach((item: Record<string, any>) => {
    rows.push(
      ...keys.map((keyName) => [
        item[KEEN_KEY],
        keyName,
        valueFormatter(item[keyName], formatValue),
      ])
    );
  });

  return [columns, ...rows];
};
