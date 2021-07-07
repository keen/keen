import {
  showAllMarks,
  groupMarksByPosition,
  findMarksInCluster,
} from './marks.utils';

import { generateLines } from './chart.utils';

import { lineChart } from '../line-chart.fixtures';

const mark = {
  key: '@mark',
  color: 'grey',
  x: 10,
  y: 20,
  selector: ['selector'],
};

const line = {
  key: '@line',
  d: 'M12 L23',
  selector: ['selector'],
  color: 'black',
};

test('returns "false" for empty marks and lines collection', () => {
  const stepMode = false;

  const result = showAllMarks(
    stepMode,
    [{ ...mark, radius: 2, dataSerieKey: '@data-serie/01' }],
    [{ ...line, strokeWidth: 2 }]
  );

  expect(result).toBeFalsy();
});

test('returns "false" for disabled step mode and when marksRadius is smaller than lines strokeWidth / 2', () => {
  const stepMode = false;

  const result = showAllMarks(
    stepMode,
    [{ ...mark, radius: 2, dataSerieKey: '@data-serie/01' }],
    [{ ...line, strokeWidth: 2 }]
  );

  expect(result).toBeFalsy();
});

test('returns "true" for enabled step mode', () => {
  const stepMode = true;

  const result = showAllMarks(
    stepMode,
    [{ ...mark, radius: 2, dataSerieKey: '@data-serie/01' }],
    [{ ...line, strokeWidth: 2 }]
  );

  expect(result).toBeTruthy();
});

test('returns "true" when marksRadius is smaller than lines strokeWidth / 2', () => {
  const stepMode = false;

  const result = showAllMarks(
    stepMode,
    [{ ...mark, radius: 1, dataSerieKey: '@data-serie/01' }],
    [{ ...line, strokeWidth: 2 }]
  );

  expect(result).toBeTruthy();
});

test('should group marks by position', () => {
  const result = groupMarksByPosition([
    { ...mark, radius: 1, dataSerieKey: '@data-serie/01' },
    { ...mark, radius: 1, dataSerieKey: '@data-serie/02' },
  ]);

  expect(result[10].length).toBe(2);
});

test('should not group marks by position', () => {
  const result = groupMarksByPosition([
    { ...mark, radius: 1, dataSerieKey: '@data-serie/01' },
    {
      key: '@mark',
      color: 'grey',
      x: 20,
      y: 20,
      selector: ['selector'],
      radius: 1,
      dataSerieKey: '@data-serie/01',
    },
  ]);

  expect(result[10].length).toBe(1);
  expect(result[20].length).toBe(1);
});

test('should find all marks in cluster', () => {
  const result = findMarksInCluster(
    { ...mark, radius: 1, dataSerieKey: '@data-serie/01' },
    {
      10: [
        { ...mark, radius: 1, dataSerieKey: '@data-serie/02' },
        {
          key: '@mark',
          color: 'grey',
          x: 10,
          y: 25,
          selector: ['selector'],
          radius: 1,
          dataSerieKey: '@data-serie/03',
        },
      ],
    }
  );

  expect(result.length).toBe(2);
});

test('should not find all marks in cluster', () => {
  const result = findMarksInCluster(
    { ...mark, radius: 1, dataSerieKey: '@data-serie/01' },
    {
      10: [
        { ...mark, radius: 1, dataSerieKey: '@data-serie/02' },
        {
          key: '@mark',
          color: 'grey',
          x: 10,
          y: 40,
          selector: ['selector'],
          radius: 1,
          dataSerieKey: '@data-serie/03',
        },
      ],
    }
  );

  expect(result.length).toBe(1);
});

test('should generate marks correctly', () => {
  const data = [
    { label: '2020-01-01T00:00:00.000Z', sale: -3, buy: 11, revenue: 30 },
  ];

  const lineChartSettings: any = {
    data,
    ...lineChart,
  };

  const { marks } = generateLines(lineChartSettings);

  expect(marks).toMatchInlineSnapshot(`
    Array [
      Object {
        "color": "red",
        "dataSerieKey": "revenue",
        "key": "0.revenue.mark",
        "radius": undefined,
        "selector": Array [
          0,
          "revenue",
        ],
        "x": 250,
        "y": 133.33333333333334,
      },
      Object {
        "color": "blue",
        "dataSerieKey": "buy",
        "key": "0.buy.mark",
        "radius": undefined,
        "selector": Array [
          0,
          "buy",
        ],
        "x": 250,
        "y": 42.8888888888889,
      },
      Object {
        "color": "green",
        "dataSerieKey": "sale",
        "key": "0.sale.mark",
        "radius": undefined,
        "selector": Array [
          0,
          "sale",
        ],
        "x": 250,
        "y": 67.55555555555556,
      },
    ]
  `);
});
