import { Quaternion } from '../../types';

const combineQuartenions = (q1: Quaternion, q2: Quaternion) => {
  if (!q1 || !q2) return;

  const a = q1[0],
    b = q1[1],
    c = q1[2],
    d = q1[3],
    e = q2[0],
    f = q2[1],
    g = q2[2],
    h = q2[3];

  return [
    a * e - b * f - c * g - d * h,
    b * e + a * f + c * h - d * g,
    a * g - b * h + c * e + d * f,
    a * h + b * g - c * f + d * e,
  ];
};

export default combineQuartenions;
