export type Vector = [number, number];

export type Quaternion = [number, number, number, number];

export type EulerAngles = [number, number, number];

export type CartesianCords = [number, number, number];

const TO_RADIANS = Math.PI / 180;
const TO_DEGREES = 180 / Math.PI;

export const calculateHypotenuse = (
  x: number,
  y: number,
  radius: number
): [number, number] => {
  const height = Math.sqrt(x * x + y * y);
  return [(x / height) * radius, (y / height) * radius];
};

export const calculateCross = (v0: CartesianCords, v1: CartesianCords) => {
  return [
    v0[1] * v1[2] - v0[2] * v1[1],
    v0[2] * v1[0] - v0[0] * v1[2],
    v0[0] * v1[1] - v0[1] * v1[0],
  ];
};

export const calculateDot = (v0: any, v1: any) => {
  let sum = 0;
  for (let i = 0; v0.length > i; ++i) sum += v0[i] * v1[i];
  return sum;
};

function lonLatToCartesianCords(coord: Vector): [number, number, number] {
  const lon = coord[0] * TO_RADIANS;
  const lat = coord[1] * TO_RADIANS;

  const x = Math.cos(lat) * Math.cos(lon);
  const y = Math.cos(lat) * Math.sin(lon);
  const z = Math.sin(lat);

  return [x, y, z];
}

export const quaternion = (
  v0: CartesianCords,
  v1: CartesianCords
): Quaternion => {
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

export const convertEulerToQuartenion = (e: EulerAngles): Quaternion => {
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

export const combineQuartenions = (q1: Quaternion, q2: Quaternion) => {
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

export const convertQuartenionToEuler = (t: Quaternion) => {
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

export const calculateEulerAngles = (
  v0: Vector,
  v1: Vector,
  eulerAngles: EulerAngles
) => {
  const t = combineQuartenions(
    convertEulerToQuartenion(eulerAngles),
    quaternion(lonLatToCartesianCords(v0), lonLatToCartesianCords(v1))
  ) as Quaternion;
  return convertQuartenionToEuler(t);
};
