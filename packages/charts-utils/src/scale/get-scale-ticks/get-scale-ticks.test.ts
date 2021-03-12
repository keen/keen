import { scaleBand, scaleLinear } from 'd3-scale';
import {
  register as registerTimezone,
  unregister as unregisterTimezone,
} from 'timezone-mock';

import getScaleTicks from './get-scale-ticks';

// import { ScaleSettings } from '../../types';

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

// test('returns time scale values in yearly range', () => {
//   const firstDate = new Date('2017-01-01T00:00:00.000Z');
//   const lastDate = new Date('2020-01-01T00:00:00.000Z');
//
//   const scale = scaleTime().range([0, 10]).domain([firstDate, lastDate]);
//
//   const scaleSettings: ScaleSettings = { type: 'time', precision: 'year' };
//
//   expect(getScaleTicks(scale, scaleSettings)).toMatchInlineSnapshot(`
//     Array [
//       "2017-01-01T00:00:00.000Z",
//       "2018-01-01T00:00:00.000Z",
//       "2019-01-01T00:00:00.000Z",
//       "2020-01-01T00:00:00.000Z",
//     ]
//   `);
// });
//
// test('returns time scale values in monthly range', () => {
//   const firstDate = new Date('2020-01-01T00:00:00.000Z');
//   const lastDate = new Date('2020-03-01T00:00:00.000Z');
//
//   const scale = scaleTime().range([0, 10]).domain([firstDate, lastDate]);
//
//   const scaleSettings: ScaleSettings = { type: 'time', precision: 'month' };
//
//   expect(getScaleTicks(scale, scaleSettings)).toMatchInlineSnapshot(`
//     Array [
//       "2020-01-01T00:00:00.000Z",
//       "2020-02-01T00:00:00.000Z",
//       "2020-03-01T00:00:00.000Z",
//     ]
//   `);
// });
//
// test('returns time scale values in weekly range', () => {
//   const firstDate = new Date('2020-01-15T00:00:00.000Z');
//   const lastDate = new Date('2020-02-15T00:00:00.000Z');
//
//   const scale = scaleTime().range([0, 10]).domain([firstDate, lastDate]);
//
//   const scaleSettings: ScaleSettings = { type: 'time', precision: 'week' };
//
//   expect(getScaleTicks(scale, scaleSettings)).toMatchInlineSnapshot(`
//     Array [
//       "2020-01-19T00:00:00.000Z",
//       "2020-01-26T00:00:00.000Z",
//       "2020-02-02T00:00:00.000Z",
//       "2020-02-09T00:00:00.000Z",
//       "2020-02-15T00:00:00.000Z",
//     ]
//   `);
// });
//
// test('returns time scale values in daily range', () => {
//   const firstDate = new Date('2020-01-01T00:00:00.000Z');
//   const lastDate = new Date('2020-01-05T00:00:00.000Z');
//
//   const scale = scaleTime().range([0, 10]).domain([firstDate, lastDate]);
//
//   const scaleSettings: ScaleSettings = { type: 'time', precision: 'day' };
//
//   expect(getScaleTicks(scale, scaleSettings)).toMatchInlineSnapshot(`
//     Array [
//       "2020-01-01T00:00:00.000Z",
//       "2020-01-02T00:00:00.000Z",
//       "2020-01-03T00:00:00.000Z",
//       "2020-01-04T00:00:00.000Z",
//       "2020-01-05T00:00:00.000Z",
//     ]
//   `);
// });
//
// test('returns time scale values in hours range', () => {
//   const firstDate = new Date('2020-01-15T12:00:00.000Z');
//   const lastDate = new Date('2020-01-15T16:00:00.000Z');
//
//   const scale = scaleTime().range([0, 10]).domain([firstDate, lastDate]);
//
//   const scaleSettings: ScaleSettings = { type: 'time', precision: 'hour' };
//
//   expect(getScaleTicks(scale, scaleSettings)).toMatchInlineSnapshot(`
//     Array [
//       "2020-01-15T12:00:00.000Z",
//       "2020-01-15T13:00:00.000Z",
//       "2020-01-15T14:00:00.000Z",
//       "2020-01-15T15:00:00.000Z",
//       "2020-01-15T16:00:00.000Z",
//     ]
//   `);
// });
//
// test('returns time scale values in minute range', () => {
//   const firstDate = new Date('2020-01-15T12:00:00.000Z');
//   const lastDate = new Date('2020-01-15T12:05:00.000Z');
//
//   const scale = scaleTime().range([0, 10]).domain([firstDate, lastDate]);
//
//   const scaleSettings: ScaleSettings = { type: 'time', precision: 'minute' };
//
//   expect(getScaleTicks(scale, scaleSettings)).toMatchInlineSnapshot(`
//     Array [
//       "2020-01-15T12:00:00.000Z",
//       "2020-01-15T12:01:00.000Z",
//       "2020-01-15T12:02:00.000Z",
//       "2020-01-15T12:03:00.000Z",
//       "2020-01-15T12:04:00.000Z",
//       "2020-01-15T12:05:00.000Z",
//     ]
//   `);
// });
//
// test('returns time scale values in custom range', () => {
//   const firstDate = new Date('2020-01-02T00:00:00.000Z');
//   const lastDate = new Date('2020-01-15T00:00:00.000Z');
//
//   const scale = scaleTime().range([0, 10]).domain([firstDate, lastDate]);
//
//   const scaleSettings: ScaleSettings = {
//     type: 'time',
//     precision: 'day',
//     stepRange: 3,
//   };
//
//   expect(getScaleTicks(scale, scaleSettings)).toMatchInlineSnapshot(`
//     Array [
//       "2020-01-02T00:00:00.000Z",
//       "2020-01-05T00:00:00.000Z",
//       "2020-01-08T00:00:00.000Z",
//       "2020-01-11T00:00:00.000Z",
//       "2020-01-14T00:00:00.000Z",
//       "2020-01-15T00:00:00.000Z",
//     ]
//   `);
// });
