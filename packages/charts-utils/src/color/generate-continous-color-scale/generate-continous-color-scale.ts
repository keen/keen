import { scaleLinear } from 'd3-scale';
import { colors as palette } from '@keen.io/colors';

/**
 * Generate a linear color scale for heatmap, choropleth and sliders
 *
 * @param minValue - minimal data value
 * @param maxValue - maximal data value
 * @param steps - amount of steps for scale
 * @param colors - colors array
 * @return a color scale
 *
 */

const generateContinousColorScale = (
  minValue: number,
  maxValue: number,
  steps = 2,
  colors: string[]
) => {
  if (steps <= 1 || colors.length === 1) {
    const positiveColor = colors.length === 1 ? 'red' : colors[1];
    const domainValues =
      minValue < 0 && maxValue > 0
        ? [minValue, 0, maxValue]
        : [minValue, maxValue];
    const rangeColors = (minValue: number, maxValue: number) => {
      if (minValue < 0 && maxValue > 0)
        return [colors[0], palette.white[500], positiveColor];
      if (minValue < 0 && maxValue <= 0) return [colors[0], palette.white[500]];
      return [palette.white[500], colors[0]];
    };
    return scaleLinear<string>()
      .domain(domainValues)
      .range(rangeColors(minValue, maxValue));
  }
  const step = Math.abs((maxValue - minValue) / steps);
  const domainValues: number[] = [];

  if (minValue < 0 && maxValue > 0) {
    const negativeSteps =
      Math.abs(minValue) < step ? 1 : Math.floor(Math.abs(minValue) / step);
    const positiveSteps = maxValue < step ? 1 : Math.floor(maxValue / step);

    const newColors = [
      ...colors.slice(0, negativeSteps),
      palette.white[500],
      ...colors.slice(negativeSteps, negativeSteps + positiveSteps),
    ];
    for (let i = 0; i < negativeSteps; i++) {
      if (i * step + minValue < 0) {
        domainValues.push(i * step + minValue);
      }
    }
    for (let i = 0; i < positiveSteps; i++) {
      if (maxValue - i * step > 0) {
        domainValues.push(maxValue - i * step);
      }
    }
    domainValues.push(0);
    domainValues.sort((a, b) => a - b);

    return scaleLinear<string>().domain(domainValues).range(newColors);
  }

  for (let i = 0; i < steps; i++) {
    domainValues.push(i * step + minValue);
  }
  return scaleLinear<string>()
    .domain(domainValues)
    .range(colors.slice(0, steps));
};

export default generateContinousColorScale;
