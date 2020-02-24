import { generateGroupedLines, generateStackLines } from './line-chart.utils';

import { lineChart } from './line-chart.fixtures';

describe('@keen/charts', () => {
  describe('<LineChart /> - utils', () => {
    const data = [
      { label: '2020-01-01T00:00:00.000Z', sale: -3, buy: 11, revenue: 30 },
      { label: '2020-03-01T00:00:00.000Z', sale: 12, buy: 3, revenue: 21 },
      { label: '2020-02-01T00:00:00.000Z', sale: -3, buy: 11, revenue: 30 },
    ];

    describe('generateGroupedLines()', () => {
      const chart: any = {
        data,
        ...lineChart,
      };

      it('should create proper domain for xScale', () => {
        const { xScale } = generateGroupedLines(chart);

        expect(xScale.domain()).toMatchInlineSnapshot(`
          Array [
            2020-01-01T00:00:00.000Z,
            2020-02-01T00:00:00.000Z,
          ]
        `);
      });

      it('should create proper domain for yScale', () => {
        const { yScale } = generateGroupedLines(chart);

        expect(yScale.domain()).toMatchInlineSnapshot(`
          Array [
            -5,
            30,
          ]
        `);
      });

      it('should calculate lines and apply colors', () => {
        const { lines } = generateGroupedLines(chart);

        expect(lines).toMatchSnapshot();
      });

      it('should not create lines for disabled keys', () => {
        const { lines } = generateGroupedLines({
          ...chart,
          disabledKeys: ['revenue'],
        });

        const result = [
          { key: 'sale', selector: [0, 'sale'] },
          { key: 'buy', selector: [1, 'buy'] },
        ];

        expect(lines).toMatchObject(result);
      });
    });
    describe('generateStackLines()', () => {
      const chart: any = {
        data,
        ...lineChart,
      };

      it('should create proper domain for xScale', () => {
        const { xScale } = generateStackLines(chart);

        expect(xScale.domain()).toMatchInlineSnapshot(`
          Array [
            Date { NaN },
            Date { NaN },
          ]
        `);
      });

      it('should create proper domain for yScale', () => {
        const { yScale } = generateStackLines(chart);

        expect(yScale.domain()).toMatchInlineSnapshot(`
          Array [
            0,
            40,
          ]
        `);
      });

      it('should calculate lines and apply colors', () => {
        const { lines } = generateStackLines(chart);

        expect(lines).toMatchSnapshot();
      });

      it('should not create lines for disabled keys', () => {
        const { lines } = generateStackLines({
          ...chart,
          disabledKeys: ['revenue'],
        });

        const result = [
          { key: 'sale', selector: [0, 'sale'] },
          { key: 'buy', selector: [1, 'buy'] },
        ];

        expect(lines).toMatchObject(result);
      });
    });
  });
});
