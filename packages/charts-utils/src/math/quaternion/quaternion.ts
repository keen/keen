import calculateCross from '../calculate-cross';
import calculateDot from '../calculate-dot';

import { CartesianCords, Quaternion } from '../../types';

/**
 * Calculates quaternion based on provided cartesian coordinates.
 *
 * @param v0 - cartesian coordinates
 * @param v1 - cartesian coordinates
 * @return quaternion
 *
 */
const quaternion = (v0: CartesianCords, v1: CartesianCords): Quaternion => {
  if (v0 && v1) {
    const cross = calculateCross(v0, v1),
      vectorLength = Math.sqrt(calculateDot(cross, cross));
    if (vectorLength == 0) return;

    const theta =
      0.5 * Math.acos(Math.max(-1, Math.min(1, calculateDot(v0, v1))));
    const qi = (cross[2] * Math.sin(theta)) / vectorLength;
    const qj = (-cross[1] * Math.sin(theta)) / vectorLength;
    const qk = (cross[0] * Math.sin(theta)) / vectorLength;
    const qr = Math.cos(theta);

    return theta && [qr, qi, qj, qk];
  }
};

export default quaternion;
