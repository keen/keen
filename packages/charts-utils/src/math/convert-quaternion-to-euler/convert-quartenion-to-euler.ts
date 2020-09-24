import { TO_DEGREES } from '../../constants';

import { Quaternion } from '../../types';

const convertQuaternionToEuler = (t: Quaternion) => {
  if (!t) return;
  return [
    Math.atan2(
      2 * (t[0] * t[1] + t[2] * t[3]),
      1 - 2 * (t[1] * t[1] + t[2] * t[2])
    ) * TO_DEGREES,
    Math.asin(Math.max(-1, Math.min(1, 2 * (t[0] * t[2] - t[3] * t[1])))) *
      TO_DEGREES,
    Math.atan2(
      2 * (t[0] * t[3] + t[1] * t[2]),
      1 - 2 * (t[2] * t[2] + t[3] * t[3])
    ) * TO_DEGREES,
  ];
};

export default convertQuaternionToEuler;
