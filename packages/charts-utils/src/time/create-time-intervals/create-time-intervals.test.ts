import { scaleUtc } from 'd3-scale';

import createTimeIntervals from './create-time-intervals';

import {
  register as registerTimezone,
  unregister as unregisterTimezone,
} from 'timezone-mock';

beforeAll(() => {
  registerTimezone('UTC');
});

afterAll(() => {
  unregisterTimezone();
});

test('set "minute" precision and creates "15 minutes" intervals', () => {
  const scale = scaleUtc()
    .range([0, 150])
    .domain([
      new Date('2020-10-01T15:00:00.000Z'),
      new Date('2020-10-01T15:30:00.000Z'),
    ]);

  const result = createTimeIntervals(scale);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "precision": "minute",
      "ticks": Array [
        "2020-10-01T15:00:00.000Z",
        "2020-10-01T15:15:00.000Z",
      ],
    }
  `);
});

test('set "minute" precision and creates "5 minutes" intervals', () => {
  const scale = scaleUtc()
    .range([0, 450])
    .domain([
      new Date('2020-10-01T15:00:00.000Z'),
      new Date('2020-10-01T15:30:00.000Z'),
    ]);

  const result = createTimeIntervals(scale);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "precision": "minute",
      "ticks": Array [
        "2020-10-01T15:00:00.000Z",
        "2020-10-01T15:05:00.000Z",
        "2020-10-01T15:10:00.000Z",
        "2020-10-01T15:15:00.000Z",
        "2020-10-01T15:20:00.000Z",
        "2020-10-01T15:25:00.000Z",
      ],
    }
  `);
});

test('set "year" precision and creates "2 year" intervals', () => {
  const scale = scaleUtc()
    .range([0, 200])
    .domain([
      new Date('2017-01-01T00:00:00.000Z'),
      new Date('2020-10-01T00:00:00.000Z'),
    ]);

  const result = createTimeIntervals(scale);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "precision": "year",
      "ticks": Array [
        "2017-01-01T00:00:00.000Z",
        "2019-01-01T00:00:00.000Z",
      ],
    }
  `);
});

test('set "month" precision and creates "3 month" intervals', () => {
  const scale = scaleUtc()
    .range([0, 170])
    .domain([
      new Date('2020-01-01T00:00:00.000Z'),
      new Date('2020-06-01T00:00:00.000Z'),
    ]);

  const result = createTimeIntervals(scale);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "precision": "month",
      "ticks": Array [
        "2020-01-01T00:00:00.000Z",
        "2020-04-01T00:00:00.000Z",
      ],
    }
  `);
});

test('set "month" precision and creates "6 month" intervals', () => {
  const scale = scaleUtc()
    .range([0, 200])
    .domain([
      new Date('2020-01-01T00:00:00.000Z'),
      new Date('2020-10-01T00:00:00.000Z'),
    ]);

  const result = createTimeIntervals(scale);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "precision": "month",
      "ticks": Array [
        "2020-01-01T00:00:00.000Z",
        "2020-07-01T00:00:00.000Z",
      ],
    }
  `);
});

test('set "hour" precision and creates "1 hour" intervals', () => {
  const scale = scaleUtc()
    .range([0, 300])
    .domain([
      new Date('2020-02-01T12:33:00.000Z'),
      new Date('2020-02-01T16:33:00.000Z'),
    ]);

  const result = createTimeIntervals(scale);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "precision": "hour",
      "ticks": Array [
        "2020-02-01T13:00:00.000Z",
        "2020-02-01T14:00:00.000Z",
        "2020-02-01T15:00:00.000Z",
        "2020-02-01T16:00:00.000Z",
      ],
    }
  `);
});

test('set "hour" precision and creates single interval', () => {
  const scale = scaleUtc()
    .range([0, 120])
    .domain([
      new Date('2020-02-01T12:33:00.000Z'),
      new Date('2020-02-01T16:33:00.000Z'),
    ]);

  const result = createTimeIntervals(scale);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "precision": "hour",
      "ticks": Array [
        "2020-02-01T13:00:00.000Z",
      ],
    }
  `);
});
