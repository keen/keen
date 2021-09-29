import {
  formatValue as valueFormatter,
  Formatter,
} from '@keen.io/charts-utils';
import { KEEN_TABLE_INTERVAL, KEEN_KEY } from '@keen.io/parser';

import { VALUE } from '../../constants';

/**
 * Categorical transformation for line chart
 *
 * @param data - data series
 * @param keys - keys selectors
 * @return transformed structure
 *
 */
export const categoricalTransformation = (
  data: Record<string, any>,
  keys: string[],
  formatValue: Formatter,
  columnName: string
) => {
  const columns = [KEEN_TABLE_INTERVAL, columnName, VALUE];
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

  return [columns, rows];
};
