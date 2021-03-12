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

// test('creates intervals', () => {
//   const scale = scaleUtc().domain([
//     new Date('2020-02-01T12:30:00.000Z'),
//     new Date('2020-02-01T13:30:00.000Z'),
//   ]);
//
//   const result = createTimeAxisIntervals(scale);
//
//   expect(result).toMatchInlineSnapshot(`
//     Object {
//       "precision": "minute",
//       "stepRange": 30,
//       "ticks": Array [
//         "2020-02-01T12:30:00.000Z",
//         "2020-02-01T13:00:00.000Z",
//       ],
//     }
//   `);
// });

test('creates intervals', () => {
  const scale = scaleUtc()
    .range([0, 120])
    .domain([
      new Date('2020-02-01T12:33:00.000Z'),
      new Date('2020-02-01T16:33:00.000Z'),
    ]);

  const result = createTimeAxisIntervals(scale);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "precision": "hour",
      "ticks": Array [
        "2020-02-01T13:00:00.000Z",
      ],
    }
  `);
});
//
// test('creates intervals', () => {
//   const scale = scaleUtc().domain([
//     new Date('2020-01-01T03:00:00.000Z'),
//     new Date('2020-01-01T05:10:00.000Z'),
//   ]);
//
//   const result = createTimeAxisIntervals(scale);
//
//   expect(result).toMatchInlineSnapshot(`
//     Object {
//       "precision": "hour",
//       "stepRange": 1,
//       "ticks": Array [
//         "2020-01-01T03:00:00.000Z",
//         "2020-01-01T04:00:00.000Z",
//         "2020-01-01T05:00:00.000Z",
//       ],
//     }
//   `);
// });
