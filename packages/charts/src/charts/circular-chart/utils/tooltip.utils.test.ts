import { getCircularChartTooltipContent } from './tooltip.utils';

import { chartData } from '../../donut/donut-chart.fixtures';
import { OTHERS_DATA_KEY } from '../constants';

describe('getCircularChartTooltipContent()', () => {
  const keys = ['buy', 'sold'];
  const labelSelector = 'name';

  it('should return content for single selector', () => {
    const selectors = [{ color: 'red', selector: [2] }];
    const result = getCircularChartTooltipContent({
      data: chartData,
      keys,
      labelSelector,
      selectors,
    });

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "color": "red",
          "data": Object {
            "change": "(31.0%)",
            "label": "Games",
            "value": "39",
          },
        },
      ]
    `);
  });

  it('should return "Others" data label for multiple selectors', () => {
    const selectors = [
      { color: 'red', selector: [4] },
      { color: 'blue', selector: [5] },
    ];
    const result = getCircularChartTooltipContent({
      data: chartData,
      keys,
      labelSelector,
      selectors,
    });

    expect(result[0].data).toEqual(OTHERS_DATA_KEY);
  });

  it('should return content for multiple selectors', () => {
    const selectors = [
      { color: 'red', selector: [4] },
      { color: 'blue', selector: [5] },
    ];
    const result = getCircularChartTooltipContent({
      data: chartData,
      keys,
      labelSelector,
      selectors,
    });

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "color": "#CDCFD3",
          "data": "Others",
        },
        Object {
          "color": "rgba(0, 0, 0, 0)",
          "data": Object {
            "change": "(2.4%)",
            "label": "Cars",
            "value": "3",
          },
        },
        Object {
          "color": "rgba(0, 0, 0, 0)",
          "data": Object {
            "change": "(4.0%)",
            "label": "Bikes",
            "value": "5",
          },
        },
      ]
    `);
  });

  it('disabled labels are not included in total value', () => {
    const selectors = [
      { color: 'red', selector: [0] },
      { color: 'blue', selector: [1] },
    ];
    const result = getCircularChartTooltipContent({
      data: chartData,
      keys,
      labelSelector,
      selectors,
      disabledLabels: ['Games', 'Sounds', 'Cars', 'Bikes'],
    });

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "color": "#CDCFD3",
          "data": "Others",
        },
        Object {
          "color": "rgba(0, 0, 0, 0)",
          "data": Object {
            "change": "(40.7%)",
            "label": "Books",
            "value": "22",
          },
        },
        Object {
          "color": "rgba(0, 0, 0, 0)",
          "data": Object {
            "change": "(59.3%)",
            "label": "Apps",
            "value": "32",
          },
        },
      ]
    `);
  });

  it('should format value by function', () => {
    const selectors = [{ color: 'red', selector: [2] }];
    const formatValue = (value) => `$${value}`;
    const result = getCircularChartTooltipContent({
      data: chartData,
      keys,
      labelSelector,
      selectors,
      formatValue,
    });

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "color": "red",
          "data": Object {
            "change": "(31.0%)",
            "label": "Games",
            "value": "$39",
          },
        },
      ]
    `);
  });

  it('should format value by string formatter', () => {
    const selectors = [{ color: 'red', selector: [2] }];
    const formatValue = '${number; 0.00}';
    const result = getCircularChartTooltipContent({
      data: chartData,
      keys,
      labelSelector,
      selectors,
      formatValue,
    });

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "color": "red",
          "data": Object {
            "change": "(31.0%)",
            "label": "Games",
            "value": "39.00",
          },
        },
      ]
    `);
  });
});
