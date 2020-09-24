import transformToPercent from './transform-to-percent';

test('transform series values to percents', () => {
  const data = [
    { day: 'Monday', woman: 10, man: 5 },
    { day: 'Tuesday', woman: 20, man: 20 },
  ];

  const result = transformToPercent(data, ['man', 'woman']);

  expect(result).toMatchSnapshot();
});
