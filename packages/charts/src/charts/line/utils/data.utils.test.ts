import {
  calculateStackData,
  calculateStackAreaData,
  sortKeys,
  calculateMaxMinSeriesValue,
} from './data.utils';

import { lineChart } from '../line-chart.fixtures';

const data = [
  { label: '2020-01-01T00:00:00.000Z', sale: -3, buy: 11, revenue: 30 },
  { label: '2020-03-01T00:00:00.000Z', sale: 12, buy: 3, revenue: 21 },
  { label: '2020-02-01T00:00:00.000Z', sale: -3, buy: 11, revenue: 30 },
];

test('should calculate correctly stack data', () => {
  const stackData = calculateStackData(
    data,
    lineChart.labelSelector,
    lineChart.keys
  );

  expect(stackData).toMatchInlineSnapshot(`
    Array [
      Object {
        "buy": 8,
        "label": "2020-01-01T00:00:00.000Z",
        "revenue": 38,
        "sale": -3,
      },
      Object {
        "buy": 15,
        "label": "2020-03-01T00:00:00.000Z",
        "revenue": 36,
        "sale": 12,
      },
      Object {
        "buy": 8,
        "label": "2020-02-01T00:00:00.000Z",
        "revenue": 38,
        "sale": -3,
      },
    ]
  `);
});

test('should calculate correctly stack area data', () => {
  const stackAreaData = calculateStackAreaData(
    data,
    lineChart.labelSelector,
    lineChart.keys
  );

  expect(stackAreaData).toMatchInlineSnapshot(`
    Object {
      "firstDataPart": Array [
        Object {
          "buy": -3,
          "label": "2020-01-01T00:00:00.000Z",
          "revenue": 8,
          "sale": 0,
        },
        Object {
          "buy": 12,
          "label": "2020-03-01T00:00:00.000Z",
          "revenue": 15,
          "sale": 0,
        },
        Object {
          "buy": -3,
          "label": "2020-02-01T00:00:00.000Z",
          "revenue": 8,
          "sale": 0,
        },
      ],
      "secondDataPart": Array [
        Object {
          "buy": 8,
          "label": "2020-02-01T00:00:00.000Z",
          "revenue": 38,
          "sale": -3,
        },
        Object {
          "buy": 15,
          "label": "2020-03-01T00:00:00.000Z",
          "revenue": 36,
          "sale": 12,
        },
        Object {
          "buy": 8,
          "label": "2020-01-01T00:00:00.000Z",
          "revenue": 38,
          "sale": -3,
        },
      ],
    }
  `);
});

test('should sort keys correctly', () => {
  const sortedKeys = sortKeys(data, lineChart.keys);

  expect(sortedKeys).toMatchInlineSnapshot(`
    Array [
      "revenue",
      "buy",
      "sale",
    ]
  `);
});

test('should calculate correctly min and max values for all series', () => {
  const minMaxSeriesValues = calculateMaxMinSeriesValue(
    data,
    lineChart.labelSelector
  );

  expect(minMaxSeriesValues).toMatchInlineSnapshot(`
    Object {
      "buy": Object {
        "max": 11,
        "min": 3,
      },
      "revenue": Object {
        "max": 30,
        "min": 21,
      },
      "sale": Object {
        "max": 12,
        "min": -3,
      },
    }
  `);
});
