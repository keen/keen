import getStepsFromInterval from './get-steps-from-interval';

test('extracts step range from interval', () => {
  const interval = 'every_20_days';

  expect(getStepsFromInterval(interval)).toEqual(20);
});
