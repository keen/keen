import { ScaleSettings } from '@keen.io/charts-utils';

import {
  generateHorizontalBlocks,
  generateVerticalBlocks,
  generateBlocks,
} from './generate-blocks';

import { heatmapChart } from '../heatmap-chart.fixtures';

import { Options as HeatmapSettings } from '../types';

const data = [
  { label: 'Windows', sale: -3, buy: 11, revenue: 30 },
  { label: 'Android', sale: 12, buy: 3, revenue: 21 },
  { label: 'Linux', sale: -3, buy: 11, revenue: 30 },
];

describe('generateBlocks()', () => {
  test('returns scale settings for "vertical" layout', () => {
    const xScaleSettings: ScaleSettings = { type: 'band' };
    const yScaleSettings: ScaleSettings = { type: 'time' };

    const chart: HeatmapSettings = {
      data,
      ...heatmapChart,
      layout: 'vertical',
      xScaleSettings,
      yScaleSettings,
    };

    const { settings } = generateBlocks(chart);

    expect(xScaleSettings).toEqual(settings.xScaleSettings);
    expect(yScaleSettings).toEqual(settings.yScaleSettings);
  });

  test('reverses scale settings for "horizontal" layout', () => {
    const xScaleSettings: ScaleSettings = { type: 'band' };
    const yScaleSettings: ScaleSettings = { type: 'time' };

    const chart: HeatmapSettings = {
      data,
      ...heatmapChart,
      layout: 'horizontal',
      xScaleSettings,
      yScaleSettings,
    };

    const { settings } = generateBlocks(chart);

    expect(xScaleSettings).toEqual(settings.yScaleSettings);
    expect(yScaleSettings).toEqual(settings.xScaleSettings);
  });
});

describe('generateVerticalBlocks()', () => {
  const chart: HeatmapSettings = {
    data,
    ...heatmapChart,
  };

  test('creates proper domain for xScale', () => {
    const { xScale } = generateVerticalBlocks(chart);

    expect(xScale.domain()).toMatchInlineSnapshot(`
        Array [
          "sale",
          "buy",
          "revenue",
        ]
      `);
  });

  test('creates proper domain for yScale', () => {
    const { yScale } = generateVerticalBlocks(chart);

    expect(yScale.domain()).toMatchInlineSnapshot(`
        Array [
          "Windows",
          "Android",
          "Linux",
        ]
      `);
  });

  test('calculates blocks and apply colors', () => {
    const { blocks } = generateVerticalBlocks(chart);

    expect(blocks).toMatchSnapshot();
  });
});

describe('generateHorizontalBlocks()', () => {
  const chart: HeatmapSettings = {
    data,
    ...heatmapChart,
  };

  test('creates proper domain for xScale', () => {
    const { xScale } = generateHorizontalBlocks(chart);

    expect(xScale.domain()).toMatchInlineSnapshot(`
        Array [
          "Windows",
          "Android",
          "Linux",
        ]
      `);
  });

  test('creates proper domain for yScale', () => {
    const { yScale } = generateHorizontalBlocks(chart);

    expect(yScale.domain()).toMatchInlineSnapshot(`
        Array [
          "sale",
          "buy",
          "revenue",
        ]
      `);
  });

  test('calculates blocks and apply colors', () => {
    const { blocks } = generateHorizontalBlocks(chart);

    expect(blocks).toMatchSnapshot();
  });
});
