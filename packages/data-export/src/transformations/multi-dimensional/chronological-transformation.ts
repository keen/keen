import {
  formatValue as valueFormatter,
  Formatter,
} from '@keen.io/charts-utils';
import { KEEN_KEY, KEEN_TABLE_INTERVAL } from '@keen.io/parser';

import { VALUE } from '../../constants';

/**
 * Chronological transformation for heatmap chart
 *
 * @param data - data series
 * @param keys - keys selectors
 * @param formatValue - value formatter
 * @param dataSeriesGroups - groups with categories
 * @return transformed structure
 */
export const chronologicalTransformation = (
  data: Record<string, any>,
  keys: string[],
  formatValue: Formatter
) => {
  const columns = [KEEN_TABLE_INTERVAL, VALUE];
  const rows: any[] = [];

  data.forEach((item: Record<string, any>) => {
    rows.push(
      ...keys.map((keyName) => [
        item[KEEN_KEY],
        valueFormatter(item[keyName], formatValue),
      ])
    );
  });

  return [columns, ...rows];
};
