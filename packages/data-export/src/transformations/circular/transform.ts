import {
  formatValue as valueFormatter,
  calculateTotalValue,
} from '@keen.io/charts-utils';
import { PieChartSettings, DonutChartSettings } from '@keen.io/charts';
import { extractGroupBySettings } from '@keen.io/query';
import { KEEN_KEY } from '@keen.io/parser';

import { COLUMN_JOIN, VALUE, PERCENTAGE_VALUE } from '../../constants';

import { TransformationInput } from '../../types';

export const transform = ({
  query,
  chartSettings,
}: TransformationInput<DonutChartSettings | PieChartSettings>) => {
  const { keys, data, tooltipSettings } = chartSettings;
  const { group_by: groupBy } = query;
  const [valueSelector] = keys;

  const formatValue = tooltipSettings?.formatValue;
  const groupColumnName = extractGroupBySettings(groupBy).join(COLUMN_JOIN);

  const total = calculateTotalValue(data, KEEN_KEY, keys);
  const columns = [groupColumnName, VALUE, PERCENTAGE_VALUE];

  return [
    columns,
    ...data.map((item) => [
      item[KEEN_KEY],
      valueFormatter(item[valueSelector], formatValue),
      `${(Math.round(item[valueSelector] * 100) / total).toFixed(1)}%`,
    ]),
  ];
};
