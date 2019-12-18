import {
  calculateRange,
  generateVerticalBars,
  generateHorizontalBars,
} from './bar-chart.utils';

import { verticalBarChart, horizontalBarChart } from './bar-chart.fixtures';

describe('@keen/charts', () => {
  describe('<BarChart /> - utils', () => {
    const data = [
      { label: 'January', sale: -3, buy: 11, revenue: 30 },
      { label: 'February', sale: 12, buy: 3, revenue: 21 },
    ];

    describe('calculateRange()', () => {
      it('should calculate minimum and maximum values for provided keys', () => {
        const { minimum, maximum } = calculateRange(data, 'auto', 'auto', [
          'sale',
          'revenue',
        ]);

        expect(minimum).toEqual(-3);
        expect(maximum).toEqual(30);
      });

      it('should return defined minimum and maximum values', () => {
        const minValue = -2;
        const maxValue = 10;

        const { minimum, maximum } = calculateRange([], minValue, maxValue, []);

        expect(minimum).toEqual(minValue);
        expect(maximum).toEqual(maxValue);
      });

      it('should return default value for minimum greater than 0', () => {
        const minValue = 3;
        const maxValue = 10;

        const { minimum } = calculateRange([], minValue, maxValue, []);

        expect(minimum).toEqual(0);
      });
    });

    describe('generateHorizontalBars()', () => {
      const chart: any = {
        data,
        ...horizontalBarChart,
      };

      it('should create proper domain for xScale', () => {
        const { xScale } = generateHorizontalBars(chart);

        expect(xScale.domain()).toMatchInlineSnapshot(`
          Array [
            -3,
            12,
          ]
        `);
      });

      it('should create proper domain for yScale', () => {
        const { yScale } = generateHorizontalBars(chart);

        expect(yScale.domain()).toMatchInlineSnapshot(`
          Array [
            "January",
            "February",
          ]
        `);
      });

      it('should calculate bars and apply colors', () => {
        const { bars } = generateHorizontalBars(chart);

        expect(bars).toMatchSnapshot();
      });
    });

    describe('generateVerticalBars()', () => {
      const chart: any = {
        data,
        ...verticalBarChart,
      };

      it('should create proper domain for xScale', () => {
        const { xScale } = generateVerticalBars(chart);

        expect(xScale.domain()).toMatchInlineSnapshot(`
          Array [
            "January",
            "February",
          ]
        `);
      });

      it('should create proper domain for yScale', () => {
        const { yScale } = generateVerticalBars(chart);

        expect(yScale.domain()).toMatchInlineSnapshot(`
          Array [
            -3,
            30,
          ]
        `);
      });

      it('should calculate bars and apply colors', () => {
        const { bars } = generateVerticalBars(chart);

        expect(bars).toMatchSnapshot();
      });
    });
  });
});
