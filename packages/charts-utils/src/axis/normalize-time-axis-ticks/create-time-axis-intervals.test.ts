import { scaleUtc } from 'd3-scale';

import createTimeAxisIntervals from './create-time-axis-intervals';

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

test('creates intervals', () => {
  const scale = scaleUtc().domain([
    new Date('2020-01-01T03:00:00.000Z'),
    new Date('2020-01-01T05:10:00.000Z'),
  ]);

  createTimeAxisIntervals(scale);
});
