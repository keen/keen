import { ScaleLinear } from 'd3-scale';

/**
 * Mutates scale domain by adjusting maximum
 * value based on scale ticks.
 *
 * @param scale - linear scale
 * @param minimum - predefined minimum value
 * @param maximum - predefined maximum value
 * @return range values
 *
 */
const calculateScaleDomain = (
  scale: ScaleLinear<number, number>,
  minimum: number,
  maximum: number
) => {
  const ticks = scale.ticks();
  const ticksLength = ticks.length;

  if (maximum > ticks[ticksLength - 1]) {
    const tickSize = ticks[1] - ticks[0];
    const difference = Math.ceil(maximum / ticksLength);
    const newMaximum =
      difference > tickSize ? ticksLength * difference : ticksLength * tickSize;
    scale.domain([minimum, newMaximum]);
  }
};

export default calculateScaleDomain;
