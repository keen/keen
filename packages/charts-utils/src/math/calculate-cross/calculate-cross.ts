import { CartesianCords } from '../../types';

/**
 * Calculates cross based on provided cartesian coordinates.
 *
 * @param v0 - cartesian coordinates
 * @param v1 - cartesian coordinates
 * @return cartesian cords for cross
 *
 */
const calculateCross = (
  v0: CartesianCords,
  v1: CartesianCords
): CartesianCords => {
  return [
    v0[1] * v1[2] - v0[2] * v1[1],
    v0[2] * v1[0] - v0[0] * v1[2],
    v0[0] * v1[1] - v0[1] * v1[0],
  ];
};

export default calculateCross;
