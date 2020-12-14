import {
  register as registerTimezone,
  unregister as unregisterTimezone,
} from 'timezone-mock';

import {
  generateGroupedLines,
  generateStackLines,
  showAllMarks,
} from './line-chart.utils';

import { lineChart } from './line-chart.fixtures';

beforeAll(() => {
  registerTimezone('UTC');
});

afterAll(() => {
  unregisterTimezone();
});

const data = [
  { label: '2020-01-01T00:00:00.000Z', sale: -3, buy: 11, revenue: 30 },
  { label: '2020-03-01T00:00:00.000Z', sale: 12, buy: 3, revenue: 21 },
  { label: '2020-02-01T00:00:00.000Z', sale: -3, buy: 11, revenue: 30 },
];

const lineChartSettings: any = {
  data,
  ...lineChart,
};

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

test('creates xScale domain for grouped line chart', () => {
  const { xScale } = generateGroupedLines(lineChartSettings);

  expect(xScale.domain()).toMatchInlineSnapshot(`
    Array [
      "2020-01-01T00:00:00.000Z",
      "2020-02-01T00:00:00.000Z",
    ]
  `);
});

test('creates yScale domain for grouped line chart', () => {
  const { yScale } = generateGroupedLines(lineChartSettings);

  expect(yScale.domain()).toMatchInlineSnapshot(`
    Array [
      -5,
      30,
    ]
  `);
});

test('applies colors for grouped lines', () => {
  const { lines } = generateGroupedLines(lineChartSettings);
  const colors = lines.map(({ color }) => color);

  expect(colors).toEqual(['red', 'blue', 'green']);
});

test('do not create grouped lines for disabled data series', () => {
  const { lines } = generateGroupedLines({
    ...lineChartSettings,
    disabledKeys: ['revenue'],
  });

  const result = [
    { key: 'sale', selector: [0, 'sale'] },
    { key: 'buy', selector: [1, 'buy'] },
  ];

  expect(lines).toMatchObject(result);
});

test('creates xScale domain for stacked line chart', () => {
  const { xScale } = generateStackLines(lineChartSettings);

  expect(xScale.domain()).toMatchInlineSnapshot(`
    Array [
      "2020-01-01T00:00:00.000Z",
      "2020-02-01T00:00:00.000Z",
    ]
  `);
});

test('creates yScale domain for stacked line chart', () => {
  const { yScale } = generateStackLines(lineChartSettings);

  expect(yScale.domain()).toMatchInlineSnapshot(`
    Array [
      -5,
      45,
    ]
  `);
});

test('applies colors for stacked lines', () => {
  const { lines } = generateGroupedLines(lineChartSettings);
  const colors = lines.map(({ color }) => color);

  expect(colors).toEqual(['red', 'blue', 'green']);
});

test('do not create stacked lines for disabled data series', () => {
  const { lines } = generateStackLines({
    ...lineChartSettings,
    disabledKeys: ['revenue'],
  });

  const result = [
    { key: 'sale', selector: [0, 'sale'] },
    { key: 'buy', selector: [1, 'buy'] },
  ];

  expect(lines).toMatchObject(result);
});

test('returns "false" for empty marks and lines collection', () => {
  const stepMode = false;

  const result = showAllMarks(
    stepMode,
    [{ ...mark, radius: 2 }],
    [{ ...line, strokeWidth: 2 }]
  );

  expect(result).toBeFalsy();
});

test('returns "false" for disabled step mode and when marksRadius is smaller than lines strokeWidth / 2', () => {
  const stepMode = false;

  const result = showAllMarks(
    stepMode,
    [{ ...mark, radius: 2 }],
    [{ ...line, strokeWidth: 2 }]
  );

  expect(result).toBeFalsy();
});

test('returns "true" for enabled step mode', () => {
  const stepMode = true;

  const result = showAllMarks(
    stepMode,
    [{ ...mark, radius: 2 }],
    [{ ...line, strokeWidth: 2 }]
  );

  expect(result).toBeTruthy();
});

test('returns "true" when marksRadius is smaller than lines strokeWidth / 2', () => {
  const stepMode = false;

  const result = showAllMarks(
    stepMode,
    [{ ...mark, radius: 1 }],
    [{ ...line, strokeWidth: 2 }]
  );

  expect(result).toBeTruthy();
});
