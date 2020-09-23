import combineQuartenions from '../combine-quartenions';
import lonLatToCartesianCords from '../lon-lat-to-cartesian-cords';
import convertEulerToQuartenion from '../convert-euler-to-quartenion';
import convertQuartenionToEuler from '../convert-quaternion-to-euler';
import quartenion from '../quaternion';

import { Vector, Quaternion, EulerAngles } from '../../types';

/**
 * Calculates euler angles based on provided vector values.
 * Used by choropleth three dimension visualizations.
 *
 * @param v0 - vector
 * @param v0 - vector
 * @return euler angles
 *
 */
const calculateEulerAngles = (
  v0: Vector,
  v1: Vector,
  eulerAngles: EulerAngles
) => {
  const t = combineQuartenions(
    convertEulerToQuartenion(eulerAngles),
    quartenion(lonLatToCartesianCords(v0), lonLatToCartesianCords(v1))
  ) as Quaternion;
  return convertQuartenionToEuler(t);
};

export default calculateEulerAngles;
