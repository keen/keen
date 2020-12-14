import createScaleSettings from './create-scale-settings';

test('creates scale step range', () => {
  const { stepRange } = createScaleSettings('every_10_days');

  expect(stepRange).toEqual(10);
});
