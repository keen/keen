import { generateFunnel } from './chart.utils';

import { chartData } from '../funnel-chart.fixtures';
import { theme } from '../../../theme';

describe('@keen/charts', () => {
  describe('<FunnelChart /> - utils', () => {
    it('should create step for each data series', () => {
      const { steps } = generateFunnel({
        data: chartData,
        key: 'value',
        colors: theme.colors,
      });

      expect(steps.length).toEqual(chartData.length);
    });

    it('should calculate percentage values for each step', () => {
      const { steps } = generateFunnel({
        data: chartData,
        key: 'value',
        colors: theme.colors,
      });

      expect(steps).toMatchObject([
        {
          percentageValue: 100,
          nextPercentageValue: 50,
        },
        {
          percentageValue: 50,
          nextPercentageValue: 25,
        },
        {
          percentageValue: 25,
          nextPercentageValue: 25,
        },
      ]);
    });

    it('should set color for each step', () => {
      const { steps } = generateFunnel({
        data: chartData,
        key: 'value',
        colors: theme.colors,
      });

      steps.forEach((step, idx) => {
        expect(step).toHaveProperty('color');
        expect(step.color).toEqual(theme.colors[idx]);
      });
    });

    it('should create "linear" scale with proper domain', () => {
      const { scale } = generateFunnel({
        data: chartData,
        key: 'value',
        colors: theme.colors,
      });

      expect(scale.domain()).toMatchInlineSnapshot(`
        Array [
          0,
          100,
        ]
      `);
    });
  });
});
