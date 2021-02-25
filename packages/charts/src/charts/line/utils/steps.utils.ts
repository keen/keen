import { ScaleLinear, ScaleTime } from 'd3-scale';

import { StepType } from '../types';

/**
 * Generate steps for each series
 *
 * @param data - step mode information
 * @param xScale - time scale
 * @param yScale - linear scale
 * @param labelSelector - selected label from data
 * @param keyName - key of series
 * @return steps for serie
 *
 */

export const generateSteps = (
  data: Record<string, any>[],
  xScale: ScaleTime<number, number>,
  yScale: ScaleLinear<number, number>,
  labelSelector: string,
  keyName: string
) => {
  const steps: StepType[] = [];
  data.forEach((_d: Record<string, any>, index: number) => {
    const value = data[index]?.[keyName];
    const range = yScale.range();
    const width = 20;
    const lastTick = yScale.ticks()[yScale.ticks().length - 1];
    const x = xScale(data[index][labelSelector]) - width / 2;

    if (keyName !== labelSelector && value) {
      const step = {
        key: `${index}.${keyName}.step`,
        selector: [index, keyName],
        x,
        y: yScale(lastTick),
        height: range[0] - range[1],
        width,
        middle: x + width / x,
      };

      steps.push(step);
    }
  });

  return steps;
};
