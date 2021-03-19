import {
  getPrefix,
  getSuffix,
  setChartSettings,
} from './metric-chart-settings';

test('getSuffix()', () => {
  expect(getSuffix('daily', 'previous')).toEqual('previous day');
  expect(
    getSuffix('every_46_hours', 'Percentage change from the previous')
  ).toEqual('Percentage change from the previous 46 hours');
  expect(getSuffix('yearly', '- Last')).toEqual('- Last year');
});

test('getPrefix()', () => {
  expect(getPrefix('count_unique')).toEqual('count of unique');
  expect(getPrefix('percentile', 65)).toEqual('65 percentile of');
  expect(getPrefix('median')).toEqual('median');
  expect(getPrefix('standard_deviation')).toEqual('standard deviation of');
});

test('Should set the correct caption for simple type without the interval and target property', () => {
  const query: any = {
    analysis_type: 'standard_deviation',
    event_collection: 'purchases',
  };
  const componentSettings = {
    type: 'simple',
  };
  expect(setChartSettings({ query, keys: [], componentSettings })).toEqual({
    caption: 'Standard deviation of purchases',
  });
});

test('Should set the correct caption for simple type with the interval ', () => {
  const query: any = {
    analysis_type: 'percentile',
    percentile: 54,
    interval: 'hourly',
    event_collection: 'purchases',
    target_property: 'books',
  };
  const componentSettings = {
    type: 'simple',
  };
  expect(setChartSettings({ query, keys: [], componentSettings })).toEqual({
    caption: '54 percentile of books - Last hour',
  });
});

test('Should set the correct caption and tooltip value for the comparison type', () => {
  const query: any = {
    analysis_type: 'sum',
    interval: 'every_46_hours',
    event_collection: 'purchases',
    target_property: 'books',
  };
  const componentSettings = {
    type: 'comparison',
  };
  expect(setChartSettings({ query, keys: [], componentSettings })).toEqual({
    caption: 'Sum of books - Last 46 hours',
    secondaryValueDescription: 'Previous 46 hours',
  });
});

test('Should set the correct caption and tooltip value for the percentage difference metric', () => {
  const query: any = {
    analysis_type: 'maximum',
    interval: 'weekly',
    event_collection: 'purchases',
    target_property: 'books',
  };
  const componentSettings = {
    type: 'difference',
    usePercentDifference: true,
  };
  expect(setChartSettings({ query, keys: [], componentSettings })).toEqual({
    caption: 'Maximum books - Last week',
    secondaryValueDescription: 'Percentage change from the previous week',
  });
});
