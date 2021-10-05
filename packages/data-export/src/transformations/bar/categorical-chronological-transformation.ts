import {
  formatValue as valueFormatter,
  calculateTotalValue,
  Formatter,
} from '@keen.io/charts-utils';
import { KEEN_KEY, KEEN_TABLE_INTERVAL } from '@keen.io/parser';

import { calculatePercent } from '../../utils';
import { COLUMN_JOIN, VALUE, PERCENTAGE_VALUE } from '../../constants';

/**
 * Chronological transformation with categories for heatmap chart
 *
 * @param data - data series
 * @param keys - keys selectors
 * @param formatValue - value formatter
 * @param dataSeriesGroups - groups with categories
 * @param includePercentageStack - calculate percent value for data series
 * @return transformed structure
 */
export const categoricalChronologicalTransformation = (
  data: Record<string, any>,
  keys: string[],
  formatValue: Formatter,
  dataSeriesGroups: string[],
  includePercentageStack: boolean
) => {
  const columns = [
    KEEN_TABLE_INTERVAL,
    dataSeriesGroups.join(COLUMN_JOIN),
    VALUE,
    ...(includePercentageStack ? [PERCENTAGE_VALUE] : []),
  ];
  const rows: any[] = [];

  data.forEach((item: Record<string, any>) => {
    const dataSeriesTotal = calculateTotalValue([item], KEEN_KEY, keys);

    rows.push(
      ...keys.map((keyName) => [
        item[KEEN_KEY],
        keyName,
        valueFormatter(item[keyName], formatValue),
        ...(includePercentageStack && item[keyName]
          ? [`${calculatePercent(item[keyName], dataSeriesTotal)}%`]
          : []),
      ])
    );
  });

  return [columns, ...rows];
};
