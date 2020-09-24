import calculateHypotenuse from './calculate-hypotenuse';

test('calculates hypotenuse', () => {
  const result = calculateHypotenuse(5, 10, 5);

  expect(result).toMatchInlineSnapshot(`
    Array [
      2.23606797749979,
      4.47213595499958,
    ]
  `);
});
