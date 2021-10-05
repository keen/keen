import {
  formatValue as valueFormatter,
  Formatter,
} from '@keen.io/charts-utils';
import { KEEN_TABLE_INTERVAL, KEEN_KEY } from '@keen.io/parser';

import { VALUE } from '../../constants';

/**
 * Default chronological transformation for line chart
 *
 * @param data - data series
 * @param keys - keys selectors
 * @return transformed structure
 *
 */
export const defaultTransformation = (
  data: Record<string, any>,
  keys: string[],
  formatValue: Formatter
) => {
  const [valueSelector] = keys;
  const columns = [KEEN_TABLE_INTERVAL, VALUE];

  return [
    columns,
    ...data.map((item: Record<string, any>) => [
      item[KEEN_KEY],
      valueFormatter(item[valueSelector], formatValue),
    ]),
  ];
};
