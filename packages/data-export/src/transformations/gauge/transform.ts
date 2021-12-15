import { formatValue as valueFormatter } from '@keen.io/charts-utils';
import { GaugeChartSettings } from '@keen.io/charts';

import { calculatePercent } from '../../utils';
import { TransformationInput } from '../../types';
import { VALUE, PERCENTAGE_VALUE } from '../../constants';
import { MINIMAL_VALUE, TARGET_VALUE } from './constants';

export const transform = ({
  chartSettings,
}: TransformationInput<GaugeChartSettings & { keys: string[] }>) => {
  const {
    data,
    formatValue,
    progressType,
    minValue,
    maxValue,
    valueKey,
    keys,
  } = chartSettings;
  const isPercentageValue = progressType === 'percent';
  const valueSelector = valueKey || keys[0];

  const columns = [
    MINIMAL_VALUE,
    TARGET_VALUE,
    VALUE,
    ...(isPercentageValue ? [PERCENTAGE_VALUE] : []),
  ];

  const rows: any[] = [];

  data.forEach((item: Record<string, any>) => {
    rows.push(
      ...keys.map((keyName) => [
        minValue ?? '',
        maxValue ?? '',
        ...(keyName === valueSelector && [
          valueFormatter(item[valueSelector], formatValue),
          ...(isPercentageValue && typeof maxValue === 'number'
            ? [`${calculatePercent(item[keyName], maxValue)}%`]
            : []),
        ]),
      ])
    );
  });

  return [columns, ...rows];
};
