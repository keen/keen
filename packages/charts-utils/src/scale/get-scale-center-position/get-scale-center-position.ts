import { ScaleBand } from 'd3-scale';

/**
 * Creates function that calculates center
 * position of value in band scale.
 *
 * @param scale - band scale
 * @return Function
 *
 */
const getScaleCenterPosition = (scale: ScaleBand<string>) => {
  const offset = scale.bandwidth() / 2;
  return (value: string) => scale(value) + offset;
};

export default getScaleCenterPosition;
