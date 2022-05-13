import {
  register as registerTimezone,
  unregister as unregisterTimezone,
} from 'timezone-mock';

import {
  generateHorizontalGroupedBars,
  generateVerticalGroupedBars,
  Options,
} from './chart.utils';

import { verticalBarChart, horizontalBarChart } from '../bar-chart.fixtures';

const data = [
  { label: 'January', sale: -3, buy: 11, revenue: 30 },
  { label: 'February', sale: 12, buy: 3, revenue: 21 },
];

beforeAll(() => {
  registerTimezone('UTC');
});

afterAll(() => {
  unregisterTimezone();
});

describe('generateHorizontalGroupedBars()', () => {
  const chart: Options = {
    data,
    ...horizontalBarChart,
  };

  test('should create proper domain for xScale', () => {
    const { xScale } = generateHorizontalGroupedBars(chart);

    expect(xScale.domain()).toMatchInlineSnapshot(`
      Array [
        -4,
        12,
      ]
    `);
  });

  test('should increase domain for xScale', () => {
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

  test('should create proper domain for yScale', () => {
    const { yScale } = generateHorizontalGroupedBars(chart);

    expect(yScale.domain()).toMatchInlineSnapshot(`
      Array [
        "February",
        "January",
      ]
    `);
  });

  test('should not create bars for disabled keys', () => {
    const data = [
      { label: 'Marketing', people: 10, rooms: 3 },
      { label: 'Customer Success', people: 16, rooms: 10 },
    ];

    const { bars } = generateHorizontalGroupedBars({
      data,
      ...horizontalBarChart,
      keys: ['people', 'rooms'],
      disabledKeys: ['rooms'],
    });

    const result = [
      { key: '0.people', selector: [0, 'people'] },
      { key: '1.people', selector: [1, 'people'] },
    ];

    expect(bars).toMatchObject(result);
  });

  test('should sort bars in "ascending" order', () => {
    const data = [
      { label: 'Marketing', people: 10, rooms: 3 },
      { label: 'Customer Success', people: 2, rooms: 10 },
    ];

    const { bars } = generateHorizontalGroupedBars({
      data,
      ...horizontalBarChart,
      keys: ['people', 'rooms'],
      barsOrder: 'ascending',
    });

    expect(bars).toMatchSnapshot();
  });

  test('should sort bars in "descending" order', () => {
    const data = [
      { label: 'Marketing', people: 15, rooms: 34 },
      { label: 'Customer Success', people: 21, rooms: 10 },
    ];

    const { bars } = generateHorizontalGroupedBars({
      data,
      ...horizontalBarChart,
      keys: ['people', 'rooms'],
      barsOrder: 'descending',
    });

    expect(bars).toMatchSnapshot();
  });

  test('should generate horizontal grouped bars with one missing color', () => {
    const data = [
      { label: 'Marketing', people: 15, rooms: 34 },
      { label: 'Customer Success', people: 21, rooms: 10 },
    ];

    const { bars } = generateHorizontalGroupedBars({
      data,
      ...horizontalBarChart,
      keys: ['people', 'rooms'],
      barsOrder: 'descending',
      colors: ['red'],
    });

    expect(bars).toMatchSnapshot();
  });
});

describe('generateVerticalGroupedBars()', () => {
  const chart: Options = {
    data,
    ...verticalBarChart,
  };

  test('should normalize intervals dates', () => {
    const data = [
      { label: '2020-01-01T12:00:00.000Z', value: 30 },
      { label: '2020-01-01T13:00:00.000Z', value: 21 },
    ];

    const { xScale } = generateVerticalGroupedBars({
      ...chart,
      keys: ['value'],
      labelSelector: 'label',
      xScaleSettings: {
        type: 'band',
        precision: 'hour',
        useUTC: false,
      },
      data,
    });

    expect(xScale.domain()).toMatchInlineSnapshot(`
      Array [
        "2020-01-01T12:00:00.000Z",
        "2020-01-01T13:00:00.000Z",
      ]
    `);
  });

  test('should create proper domain for xScale', () => {
    const { xScale } = generateVerticalGroupedBars(chart);

    expect(xScale.domain()).toMatchInlineSnapshot(`
      Array [
        "January",
        "February",
      ]
    `);
  });

  test('should create proper domain for yScale', () => {
    const { yScale } = generateVerticalGroupedBars(chart);

    expect(yScale.domain()).toMatchInlineSnapshot(`
      Array [
        -5,
        30,
      ]
    `);
  });

  test('should not create bars for disabled keys', () => {
    const data = [
      { label: 'Marketing', people: 10, rooms: 3, cars: 10 },
      { label: 'Customer Success', people: 16, rooms: 10, cars: 12 },
    ];

    const { bars } = generateHorizontalGroupedBars({
      data,
      ...verticalBarChart,
      keys: ['people', 'rooms', 'cars'],
      disabledKeys: ['rooms'],
    });

    const result = [
      { key: '0.people', selector: [0, 'people'] },
      { key: '0.cars', selector: [0, 'cars'] },
      { key: '1.people', selector: [1, 'people'] },
      { key: '1.cars', selector: [1, 'cars'] },
    ];

    expect(bars).toMatchObject(result);
  });

  test('should increase domain for yScale', () => {
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

  test('should sort bars in "ascending" order', () => {
    const data = [
      { label: 'Marketing', people: 10, rooms: 3 },
      { label: 'Customer Success', people: 2, rooms: 10 },
    ];

    const { bars } = generateVerticalGroupedBars({
      data,
      ...verticalBarChart,
      keys: ['people', 'rooms'],
      barsOrder: 'ascending',
    });

    expect(bars).toMatchSnapshot();
  });

  test('should sort bars in "descending" order', () => {
    const data = [
      { label: 'Marketing', people: 15, rooms: 34 },
      { label: 'Customer Success', people: 21, rooms: 10 },
    ];

    const { bars } = generateVerticalGroupedBars({
      data,
      ...verticalBarChart,
      keys: ['people', 'rooms'],
      barsOrder: 'descending',
    });

    expect(bars).toMatchSnapshot();
  });

  test('should generate vertical grouped bars with one missing color', () => {
    const data = [
      { label: 'Marketing', people: 15, rooms: 34 },
      { label: 'Customer Success', people: 21, rooms: 10 },
    ];

    const { bars } = generateVerticalGroupedBars({
      data,
      ...verticalBarChart,
      keys: ['people', 'rooms'],
      barsOrder: 'descending',
      colors: ['red'],
    });

    expect(bars).toMatchSnapshot();
  });
});
