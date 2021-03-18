import { scaleBand, scaleLinear, scaleUtc } from 'd3-scale';
import {
  register as registerTimezone,
  unregister as unregisterTimezone,
} from 'timezone-mock';

import getScaleTicks from './get-scale-ticks';

import { ScaleSettings } from '../../types';

beforeAll(() => {
  registerTimezone('UTC');
});

afterAll(() => {
  unregisterTimezone();
});

test('returns domain and "undefined" precision for scale band', () => {
  const domain = ['Sales', 'Marketing', 'E-commerce'];
  const scale = scaleBand().domain(domain);

  expect(getScaleTicks(scale)).toEqual({
    ticks: ['Sales', 'Marketing', 'E-commerce'],
    ticksPrecision: undefined,
  });
});

test('returns values from "linear" scale', () => {
  const scale = scaleLinear().range([0, 5]).domain([0, 10]);

  expect(getScaleTicks(scale)).toEqual({
    ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ticksPrecision: undefined,
  });
});

test('returns dates for time based scale', () => {
  const scale = scaleUtc()
    .range([0, 150])
    .domain([
      new Date('2020-10-01T15:00:00.000Z'),
      new Date('2020-10-01T15:30:00.000Z'),
    ]);

  const scaleSettings: ScaleSettings = {
    type: 'time',
  };

  expect(getScaleTicks(scale, scaleSettings)).toMatchInlineSnapshot(`
    Object {
      "ticks": Array [
        "2020-10-01T15:00:00.000Z",
        "2020-10-01T15:15:00.000Z",
      ],
      "ticksPrecision": "minute",
    }
  `);
});
