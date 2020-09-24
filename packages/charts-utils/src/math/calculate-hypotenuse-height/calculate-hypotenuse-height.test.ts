import calculateHypotenuseHeight from './calculate-hypotenuse-height';

test('calculates hypotenuse height', () => {
  const result = calculateHypotenuseHeight(2, 4);

  expect(result).toMatchInlineSnapshot(`4.47213595499958`);
});
