import {
  calculateTotalValue,
  formatValue as valueFormatter,
  Formatter,
} from '@keen.io/charts-utils';
import { KEEN_TABLE_INTERVAL, KEEN_KEY } from '@keen.io/parser';

import { calculatePercent } from '../../utils';
import { VALUE, PERCENTAGE_VALUE } from '../../constants';

/**
 * Categorical transformation for line chart
 *
 * @param data - data series
 * @param keys - keys selectors
 * @param formatValue - value formatter
 * @return transformed structure
 *
 */
export const categoricalTransformation = (
  data: Record<string, any>,
  keys: string[],
  formatValue: Formatter,
  columnName: string,
  includePercentageStack: boolean
) => {
  const columns = [
    KEEN_TABLE_INTERVAL,
    columnName,
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
        item[keyName] ? valueFormatter(item[keyName], formatValue) : 0,
        ...(includePercentageStack && item[keyName]
          ? [`${calculatePercent(item[keyName], dataSeriesTotal)}%`]
          : [`0%`]),
      ])
    );
  });

  return [columns, ...rows];
};
