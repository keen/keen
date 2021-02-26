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
  const ticksLengthPositive = ticks.filter((el) => el >= 0).length;
  const ticksLengthNegative = ticks.filter((el) => el <= 0).length;
  const tickSize = Math.abs(Math.abs(ticks[1]) - Math.abs(ticks[0]));
  let min = minimum;
  let max = maximum;

  if (maximum > ticks[ticksLength - 1]) {
    const newMaximum = ticksLengthPositive * tickSize;
    max = ticksLengthPositive > 1 || maximum > 0 ? newMaximum : -newMaximum;
  }
  if (minimum < ticks[0]) {
    const newMinimum = ticksLengthNegative * tickSize;
    min = ticksLengthNegative > 1 || minimum < 0 ? -newMinimum : newMinimum;
  }
  scale.domain([min, max]).nice();
};

export default calculateScaleDomain;
