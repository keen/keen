import {
  formatValue as valueFormatter,
  Formatter,
} from '@keen.io/charts-utils';
import { KEEN_KEY } from '@keen.io/parser';

import { VALUE } from '../../constants';

/**
 * Categorical transformation for heatmap chart
 *
 * @param data - data series
 * @param keys - keys selectors
 * @param formatValue - value formatter
 * @param dataSeriesGroups - groups with categories
 * @return transformed structure
 */
export const categoricalTransformation = (
  data: Record<string, any>,
  keys: string[],
  formatValue: Formatter,
  dataSeriesGroups: string[]
) => {
  const columns = [...dataSeriesGroups, VALUE];
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
