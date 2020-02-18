import {
  generateHorizontalGroupedBars,
  generateVerticalGroupedBars,
} from './bar-chart.utils';

import { verticalBarChart, horizontalBarChart } from './bar-chart.fixtures';

describe('@keen.io/charts', () => {
  describe('<BarChart /> - utils', () => {
    const data = [
      { label: 'January', sale: -3, buy: 11, revenue: 30 },
      { label: 'February', sale: 12, buy: 3, revenue: 21 },
    ];

    describe('generateHorizontalGroupedBars()', () => {
      const chart: any = {
        data,
        ...horizontalBarChart,
      };

      it('should create proper domain for xScale', () => {
        const { xScale } = generateHorizontalGroupedBars(chart);

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

        const { xScale } = generateHorizontalGroupedBars({
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
        const { yScale } = generateHorizontalGroupedBars(chart);

        expect(yScale.domain()).toMatchInlineSnapshot(`
          Array [
            "January",
            "February",
          ]
        `);
      });

      it('should calculate bars and apply colors', () => {
        const { bars } = generateHorizontalGroupedBars(chart);

        expect(bars).toMatchSnapshot();
      });
    });

    describe('generateVerticalGroupedBars()', () => {
      const chart: any = {
        data,
        ...verticalBarChart,
      };

      it('should create proper domain for xScale', () => {
        const { xScale } = generateVerticalGroupedBars(chart);

        expect(xScale.domain()).toMatchInlineSnapshot(`
          Array [
            "January",
            "February",
          ]
        `);
      });

      it('should create proper domain for yScale', () => {
        const { yScale } = generateVerticalGroupedBars(chart);

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

        const { yScale } = generateVerticalGroupedBars({
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
        const { bars } = generateVerticalGroupedBars(chart);

        expect(bars).toMatchSnapshot();
      });
    });
  });
});
