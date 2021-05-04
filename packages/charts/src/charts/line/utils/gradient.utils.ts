import { ScaleLinear, scaleLinear } from 'd3-scale';
import { transparentize } from 'polished';

/**
 * Generate gradient block data for area chart.
 *
 * @param minimum - min value of yScale
 * @param maximum - max value of yScale
 * @param yScale - linear scale
 * @param minKeyNameValue - min value for serie
 * @param maxKeyNameValue - max value for serie
 * @param isNegativeSeries - are all series have negative values only
 * @return y position and height of gradient block for serie
 *
 */

export const generateSeriesBlockHeight = (
  minimum: number,
  maximum: number,
  yScale: ScaleLinear<number, number>,
  minKeyNameValue: number,
  maxKeyNameValue: number,
  isNegativeSeries: boolean
): { y: number; height: number } => {
  const isMinNegative = Math.sign(minKeyNameValue) === -1;
  const height = isMinNegative
    ? yScale(minKeyNameValue)
    : yScale(minimum > 0 ? minimum : 0);
  const negativeMaxPos: number =
    maximum > 0 && maxKeyNameValue < 0 ? 0 : maxKeyNameValue;

  return {
    y: isNegativeSeries ? yScale(maximum) : yScale(negativeMaxPos),
    height:
      height - (isNegativeSeries ? yScale(maximum) : yScale(negativeMaxPos)),
  };
};

/**
 * Generate gradient data for area chart.
 *
 * @param minKeyNameValue - min value for serie
 * @param maxKeyNameValue - max value for serie
 * @param color - color for serie to calculate gradient
 * @param gradientMin - min value for specific gradient
 * @param gradientMax - max value for specific gradient
 * @return data for gradient gradient
 *
 */

export const generateAreaGradient = (
  minKeyNameValue: number,
  maxKeyNameValue: number,
  color: string,
  gradientMin: number,
  gradientMax: number
): {
  positiveColor: string;
  zeroPointColor: string;
  negativeColor: string;
  gradientZeroPercent: number;
} => {
  const isMaxNegative = Math.sign(maxKeyNameValue) === -1;
  const isMinNegative = Math.sign(minKeyNameValue) === -1;
  const positiveMax = isMaxNegative ? 0 : Math.abs(maxKeyNameValue);
  const positiveMin = isMinNegative ? Math.abs(minKeyNameValue) : 0;
  const maxValue = positiveMax > positiveMin ? positiveMax : positiveMin;
  const minAndMaxValueAreZero = positiveMax === 0 && positiveMin === 0;

  const colorScale = scaleLinear<string>()
    .domain([0, maxValue])
    .range([
      transparentize(1 - gradientMin, color),
      transparentize(1 - gradientMax, color),
    ]);

  return {
    positiveColor: colorScale(positiveMax),
    zeroPointColor: colorScale(0),
    negativeColor: colorScale(positiveMin),
    gradientZeroPercent: minAndMaxValueAreZero
      ? 0
      : (positiveMax / (positiveMax + positiveMin)) * 100,
  };
};
