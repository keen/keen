import { ColorMode } from '@keen.io/ui-core';
import { generateContinuousColorScale } from '@keen.io/charts-utils';
import { theme } from '../theme';

export const calculateColorScale = (
  minValue: number,
  maxValue: number,
  colorMode: ColorMode = 'continuous',
  steps = 2,
  colors: string[] = theme.colors
) => {
  // discrete
  if (colorMode === 'discrete' && steps > 1) {
    const step = (maxValue - minValue) / steps;
    const domainValues = colors.map((_el: string, idx: number) => {
      return Math.floor(step * idx);
    });
    domainValues.push(maxValue);
    return (value: number) => {
      const stepDomainValues = [...domainValues];
      stepDomainValues.push(value);
      stepDomainValues.sort((a, b) => a - b);
      const position = stepDomainValues.indexOf(value);
      const index = position ? position - 1 : position;
      return colors[index];
    };
  }

  // continuous
  return generateContinuousColorScale(minValue, maxValue, steps, colors);
};
