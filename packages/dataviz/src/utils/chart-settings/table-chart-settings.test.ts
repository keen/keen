import { Query } from '@keen.io/query';

import { setChartSettings } from './table-chart-settings';

test('set columns order base on query group by settings', () => {
  const query: Query = {
    analysis_type: 'count',
    timeframe: 'last_14_days',
    event_collection: 'purchases',
    group_by: ['id', 'category'],
  };

  const { columnsOrder } = setChartSettings({ query, keys: [] });

  expect(columnsOrder).toEqual(['id', 'category']);
});

test('set columns order base on extraction property names settings', () => {
  const query: Query = {
    analysis_type: 'extraction',
    timeframe: 'last_14_days',
    event_collection: 'purchases',
    property_names: ['prefix', 'category'],
  };

  const { columnsOrder } = setChartSettings({ query, keys: [] });

  expect(columnsOrder).toEqual(['prefix', 'category']);
});
