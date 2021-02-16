import { ScaleLinear, scaleLinear } from 'd3-scale';
import { transparentize } from 'polished';

export const generateSeriesBlockHeight = (
  minimum: number,
  maximum: number,
  yScale: ScaleLinear<number, number>,
  minKeyNameValue: number,
  maxKeyNameValue: number,
  isNegative: boolean
): { y: number; height: number } => {
  const isMinNegative = Math.sign(minKeyNameValue) === -1;
  const height = isMinNegative
    ? yScale(minKeyNameValue)
    : yScale(minimum > 0 ? minimum : 0);
  const negativeMaxPos: number =
    maximum > 0 && maxKeyNameValue < 0 ? 0 : maxKeyNameValue;

  return {
    y: isNegative ? yScale(maximum) : yScale(negativeMaxPos),
    height: height - (isNegative ? yScale(maximum) : yScale(negativeMaxPos)),
  };
};

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
  const isPositiveMaxBigger = positiveMax > positiveMin;
  const biggerMax = isPositiveMaxBigger ? positiveMax : positiveMin;
  const colorScale = scaleLinear<string>()
    .domain([0, biggerMax])
    .range([
      transparentize(1 - gradientMin, color),
      transparentize(1 - gradientMax, color),
    ]);

  return {
    positiveColor: colorScale(positiveMax),
    zeroPointColor: colorScale(0),
    negativeColor: colorScale(positiveMin),
    gradientZeroPercent: (positiveMax / (positiveMax + positiveMin)) * 100,
  };
};
