import {
  register as registerTimezone,
  unregister as unregisterTimezone,
} from 'timezone-mock';

import { generateGroupedLines, generateStackLines } from './chart.utils';

import { lineChart } from '../line-chart.fixtures';

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
      0,
      40,
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

test('creates yScale domain for grouped line chart negative values only', () => {
  const data = [
    { label: '2020-01-01T00:00:00.000Z', sale: -3, buy: -11, revenue: -30 },
    { label: '2020-03-01T00:00:00.000Z', sale: -12, buy: -3, revenue: -21 },
    { label: '2020-02-01T00:00:00.000Z', sale: -3, buy: -11, revenue: -30 },
  ];

  const lineChartSettings: any = {
    data,
    ...lineChart,
  };

  const { yScale } = generateGroupedLines(lineChartSettings);

  expect(yScale.domain()).toMatchInlineSnapshot(`
    Array [
      -30,
      0,
    ]
  `);
});

test('creates yScale domain for stacked line chart negative values only', () => {
  const data = [
    { label: '2020-01-01T00:00:00.000Z', sale: -3, buy: -11, revenue: -30 },
    { label: '2020-03-01T00:00:00.000Z', sale: -12, buy: -3, revenue: -21 },
    { label: '2020-02-01T00:00:00.000Z', sale: -3, buy: -11, revenue: -30 },
  ];

  const lineChartSettings: any = {
    data,
    ...lineChart,
  };

  const { yScale } = generateStackLines(lineChartSettings);

  expect(yScale.domain()).toMatchInlineSnapshot(`
    Array [
      -45,
      0,
    ]
  `);
});
