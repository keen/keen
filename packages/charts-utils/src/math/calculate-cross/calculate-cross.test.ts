import calculateCross from './calculate-cross';

import { CartesianCords } from '../../types';

test('calculates "cross" for cartesian coordinates', () => {
  const firstPoint: CartesianCords = [0, 10, 5];
  const secondPoint: CartesianCords = [5, 20, 25];
  const result = calculateCross(firstPoint, secondPoint);

  expect(result).toMatchInlineSnapshot(`
    Array [
      150,
      25,
      -50,
    ]
  `);
});
