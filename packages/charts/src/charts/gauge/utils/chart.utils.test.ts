import { generateGauge } from './chart.utils';

import { gaugeChart } from '../gauge-chart.fixtures';

describe('@keen.io/charts', () => {
  describe('<GaugeChart /> - utils', () => {
    it('should fallback to default "minimum" value for "auto" minValue', () => {
      const { minimum } = generateGauge(gaugeChart);

      expect(minimum).toMatchInlineSnapshot(`0`);
    });

    it('should fallback to default "maximum" value for "auto" maxValue', () => {
      const { maximum } = generateGauge(gaugeChart);

      expect(maximum).toMatchInlineSnapshot(`100`);
    });

    it('should return provided "minimum" value', () => {
      const maxValue = 2500;
      const { maximum } = generateGauge({
        ...gaugeChart,
        maxValue,
      });

      expect(maximum).toEqual(maxValue);
    });

    it('should return provided "minimum" value', () => {
      const minValue = -300;
      const { minimum } = generateGauge({
        ...gaugeChart,
        minValue,
      });

      expect(minimum).toEqual(minValue);
    });

    it('should create "innerArcs" based on angle range', () => {
      const { innerArcs } = generateGauge(gaugeChart);

      expect(innerArcs.length).toMatchInlineSnapshot(`189`);
    });

    it('should calculate progress value for multiple series', () => {
      const { progressValue } = generateGauge({
        ...gaugeChart,
        data: [
          { 'keen.key': 'Result', 'keen.value': 35 },
          { 'keen.key': 'Result', 'keen.value': 70 },
        ],
      });

      expect(progressValue).toEqual(105);
    });
  });
});
