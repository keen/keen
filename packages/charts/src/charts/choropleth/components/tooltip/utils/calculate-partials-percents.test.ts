import calculatePartialPercents from './calculate-partials-percents';

test('calculates percents based on total value', () => {
  const totalValue = 100;
  const partialComponents = {
    Female: 40,
    Male: 60,
  };

  const expectedResult = [
    {
      label: 'Female',
      percentValue: '40%',
      value: 40,
    },
    {
      label: 'Male',
      percentValue: '60%',
      value: 60,
    },
  ];

  expect(calculatePartialPercents(totalValue, partialComponents)).toMatchObject(
    expectedResult
  );
});
