import { TO_RADIANS } from '../../constants';

import { EulerAngles, Quaternion } from '../../types';

/**
 * Converts euler angles to queternion.
 *
 * @param e - euler angles
 * @return quaternion
 *
 */
const convertEulerToQuaternion = (e: EulerAngles): Quaternion => {
  if (!e) return;

  const roll = 0.5 * e[0] * TO_RADIANS,
    pitch = 0.5 * e[1] * TO_RADIANS,
    yaw = 0.5 * e[2] * TO_RADIANS,
    sr = Math.sin(roll),
    cr = Math.cos(roll),
    sp = Math.sin(pitch),
    cp = Math.cos(pitch),
    sy = Math.sin(yaw),
    cy = Math.cos(yaw),
    qi = sr * cp * cy - cr * sp * sy,
    qj = cr * sp * cy + sr * cp * sy,
    qk = cr * cp * sy - sr * sp * cy,
    qr = cr * cp * cy + sr * sp * sy;

  return [qr, qi, qj, qk];
};

export default convertEulerToQuaternion;
