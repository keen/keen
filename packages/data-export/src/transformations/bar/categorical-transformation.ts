import {
  formatValue as valueFormatter,
  calculateTotalValue,
  Formatter,
} from '@keen.io/charts-utils';
import { KEEN_KEY } from '@keen.io/parser';

import { calculatePercent } from '../../utils';
import { VALUE, PERCENTAGE_VALUE } from '../../constants';

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
  dataSeriesGroups: string[],
  includePercentageStack: boolean
) => {
  const columns = [
    ...dataSeriesGroups,
    VALUE,
    ...(includePercentageStack ? [PERCENTAGE_VALUE] : []),
  ];
  const rows: any[] = [];

  const isMultiGroup = dataSeriesGroups.length > 1;

  data.forEach((item: Record<string, any>) => {
    const dataSeriesTotal = calculateTotalValue([item], KEEN_KEY, keys);

    rows.push(
      ...keys.map((keyName) => [
        ...(isMultiGroup ? [item[KEEN_KEY], keyName] : [keyName]),
        valueFormatter(item[keyName], formatValue),
        ...(includePercentageStack
          ? [`${calculatePercent(item[keyName], dataSeriesTotal)}%`]
          : []),
      ])
    );
  });

  return [columns, ...rows];
};
