import { CartesianCords } from '../../types';

const calculateDot = (v0: CartesianCords, v1: CartesianCords) => {
  let sum = 0;
  for (let i = 0; v0.length > i; ++i) sum += v0[i] * v1[i];
  return sum;
};

export default calculateDot;
