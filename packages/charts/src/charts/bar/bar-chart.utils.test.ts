import {
  generateVerticalBars,
  generateHorizontalBars,
} from './bar-chart.utils';

import { verticalBarChart, horizontalBarChart } from './bar-chart.fixtures';

describe('@keen.io/charts', () => {
  describe('<BarChart /> - utils', () => {
    const data = [
      { label: 'January', sale: -3, buy: 11, revenue: 30 },
      { label: 'February', sale: 12, buy: 3, revenue: 21 },
    ];

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

      it('should increase domain for xScale', () => {
        const data = [
          { label: 'Cats', adopted: 12 },
          { label: 'Dogs', adopted: 17 },
          { label: 'Horses', adopted: 2 },
        ];

        const { xScale } = generateHorizontalBars({
          data,
          ...verticalBarChart,
          keys: ['adopted'],
        });

        expect(xScale.domain()).toMatchInlineSnapshot(`
          Array [
            0,
            18,
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

      it('should increase domain for yScale', () => {
        const data = [
          { label: 'January', revenue: 33 },
          { label: 'February', revenue: 21 },
          { label: 'March', revenue: 25 },
        ];

        const { yScale } = generateVerticalBars({
          data,
          ...verticalBarChart,
          keys: ['revenue'],
        });

        expect(yScale.domain()).toMatchInlineSnapshot(`
          Array [
            0,
            35,
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
