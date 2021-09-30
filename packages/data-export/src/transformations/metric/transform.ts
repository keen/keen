import { formatValue as valueFormatter } from '@keen.io/charts-utils';
import { MetricChartSettings } from '@keen.io/charts';
import { KEEN_TABLE_INTERVAL, KEEN_KEY } from '@keen.io/parser';

import { DIFFERENCE } from '../../constants';
import { TransformationInput } from '../../types';

export const transform = ({
  query,
  chartSettings,
}: TransformationInput<MetricChartSettings>) => {
  const { keys, data, formatValue, type } = chartSettings;
  const {
    interval,
    analysis_type: analysisType,
    event_collection: eventCollection,
  } = query;
  const [valueSelector] = keys;

  if (interval) {
    const lastItem: Record<string, any> = data[data.length - 1];
    const previousItem: Record<string, any> = data[data.length - 2];

    const currentValue = lastItem[valueSelector];
    const previousValue = previousItem ? previousItem[valueSelector] : 0;

    const additionalColumns = type !== 'simple' ? [DIFFERENCE] : [];

    const columns = [
      KEEN_TABLE_INTERVAL,
      `${analysisType}.${eventCollection}`,
      ...additionalColumns,
    ];

    return [
      columns,
      ...[previousItem, lastItem].map((item, idx) => [
        item[KEEN_KEY],
        valueFormatter(item[valueSelector], formatValue),
        ...(type !== 'simple'
          ? [idx === 0 ? 0 : currentValue - previousValue]
          : []),
      ]),
    ];
  } else {
    return [
      [`${analysisType}.${eventCollection}`],
      ...data.map((item) => [valueFormatter(item[valueSelector], formatValue)]),
    ];
  }
};
