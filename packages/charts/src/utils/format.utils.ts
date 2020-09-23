import { format } from 'd3-format';

export const formatNumber = (value: number, precision = 2) => {
  const formatter = format(`.${precision}s`);
  return formatter(value);
};
