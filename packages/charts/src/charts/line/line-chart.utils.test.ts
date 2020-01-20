import { sortDates, generateLines } from './line-chart.utils';

import { lineChart } from './line-chart.fixtures';

describe('@keen/charts', () => {
  describe('<LineChart /> - utils', () => {
    const data = [
      { label: '2020-01-01T00:00:00.000Z', sale: -3, buy: 11, revenue: 30 },
      { label: '2020-03-01T00:00:00.000Z', sale: 12, buy: 3, revenue: 21 },
      { label: '2020-02-01T00:00:00.000Z', sale: -3, buy: 11, revenue: 30 },
    ];

    describe('sortDates()', () => {
      it('should sort dates correctly', () => {
        const sortedDates = sortDates(data, lineChart.labelSelector);

        expect(sortedDates).toMatchSnapshot();
      });
    });

    describe('generateLines()', () => {
      const chart: any = {
        data,
        ...lineChart,
      };

      it('should create proper domain for xScale', () => {
        const { xScale } = generateLines(chart);

        expect(xScale.domain()).toMatchInlineSnapshot(`
          Array [
            2020-01-01T00:00:00.000Z,
            2020-03-01T00:00:00.000Z,
          ]
        `);
      });

      it('should create proper domain for yScale', () => {
        const { yScale } = generateLines(chart);

        expect(yScale.domain()).toMatchInlineSnapshot(`
          Array [
            -3,
            30,
          ]
        `);
      });

      it('should calculate lines and apply colors', () => {
        const { lines } = generateLines(chart);

        expect(lines).toMatchSnapshot();
      });
    });
  });
});
