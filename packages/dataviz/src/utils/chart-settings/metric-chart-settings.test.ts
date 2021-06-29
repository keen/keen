import { getSuffix, setChartSettings } from './metric-chart-settings';

test('getSuffix()', () => {
  expect(getSuffix('daily', 'previous')).toEqual('previous day');
  expect(
    getSuffix('every_46_hours', 'Percentage change from the previous')
  ).toEqual('Percentage change from the previous 46 hours');
  expect(getSuffix('yearly', '- Last')).toEqual('- Last year');
});

test('Should set the correct tooltip value for the comparison type', () => {
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
    secondaryValueDescription: 'Previous 46 hours',
  });
});

test('Should set the correct tooltip value for the percentage difference metric', () => {
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
    secondaryValueDescription: 'Percentage change from the previous week',
  });
});
