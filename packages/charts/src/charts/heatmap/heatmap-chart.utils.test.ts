import {
  generateHorizontalBlocks,
  generateVerticalBlocks,
} from './heatmap-chart.utils';

import { heatmapChart } from './heatmap-chart.fixtures';

describe('<Heatmap /> - utils', () => {
  const data = [
    { label: 'Windows', sale: -3, buy: 11, revenue: 30 },
    { label: 'Android', sale: 12, buy: 3, revenue: 21 },
    { label: 'Linux', sale: -3, buy: 11, revenue: 30 },
  ];

  describe('generateVerticalBlocks()', () => {
    const chart: any = {
      data,
      ...heatmapChart,
    };

    it('should create proper domain for xScale', () => {
      const { xScale } = generateVerticalBlocks(chart);

      expect(xScale.domain()).toMatchInlineSnapshot(`
        Array [
          "sale",
          "buy",
          "revenue",
        ]
      `);
    });

    it('should create proper domain for yScale', () => {
      const { yScale } = generateVerticalBlocks(chart);

      expect(yScale.domain()).toMatchInlineSnapshot(`
        Array [
          "Windows",
          "Android",
          "Linux",
        ]
      `);
    });

    it('should calculate blocks and apply colors', () => {
      const { blocks } = generateVerticalBlocks(chart);

      expect(blocks).toMatchSnapshot();
    });
  });

  describe('generateHorizontalBlocks()', () => {
    const chart: any = {
      data,
      ...heatmapChart,
    };

    it('should create proper domain for xScale', () => {
      const { xScale } = generateHorizontalBlocks(chart);

      expect(xScale.domain()).toMatchInlineSnapshot(`
        Array [
          "Windows",
          "Android",
          "Linux",
        ]
      `);
    });

    it('should create proper domain for yScale', () => {
      const { yScale } = generateHorizontalBlocks(chart);

      expect(yScale.domain()).toMatchInlineSnapshot(`
        Array [
          "sale",
          "buy",
          "revenue",
        ]
      `);
    });

    it('should calculate blocks and apply colors', () => {
      const { blocks } = generateHorizontalBlocks(chart);

      expect(blocks).toMatchSnapshot();
    });
  });
});
