import { TO_RADIANS } from '../../constants';

import { Vector } from '../../types';

/**
 * Converts vector to cartesian coordinates.
 *
 * @param coord - vector value
 * @return cartesian coordinates
 *
 */
const lonLatToCartesianCords = (coord: Vector): [number, number, number] => {
  const lon = coord[0] * TO_RADIANS;
  const lat = coord[1] * TO_RADIANS;

  const x = Math.cos(lat) * Math.cos(lon);
  const y = Math.cos(lat) * Math.sin(lon);
  const z = Math.sin(lat);

  return [x, y, z];
};

export default lonLatToCartesianCords;
