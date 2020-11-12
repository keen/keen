import { calculateRotation } from '@keen.io/charts-utils';

import getRotatedDimension from './get-rotated-dimension';

jest.mock('@keen.io/charts-utils', () => {
  return {
    calculateRotation: jest.fn().mockImplementation(() => ({
      width: 10,
      height: 10,
    })),
  };
});

const dimension = {
  width: 100,
  height: 50,
};

test('returns dimension for "0" radius angle', () => {
  const result = getRotatedDimension({ radiusAngle: 0, dimension });

  expect(result).toEqual(dimension);
});

test('returns inversed dimension for "90" radius angle', () => {
  const result = getRotatedDimension({ radiusAngle: -90, dimension });

  expect(result).toMatchInlineSnapshot(`
    Object {
      "height": 100,
      "width": 50,
    }
  `);
});

test('calculates rotation based on radius angle', () => {
  getRotatedDimension({ radiusAngle: 45, dimension });

  expect(calculateRotation).toHaveBeenCalledWith(100, 50, 45);
});
