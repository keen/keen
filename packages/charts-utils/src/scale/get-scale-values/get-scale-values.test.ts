import { scaleBand, scaleLinear, scaleUtc } from 'd3-scale';

import getScaleValues from './get-scale-values';

const domain = ['Sales', 'Marketing', 'E-commerce'];

const RealDate = Date;

beforeAll(() => {
  global.Date = jest.fn().mockImplementation(date => new RealDate(date));
  global.Date.UTC = jest
    .fn()
    .mockImplementation(date => new RealDate(date).getUTCDate());
});

afterAll(() => {
  global.Date = RealDate;
});

const firstDate = new Date('2020-01-01T00:00:00.000Z');
const lastDate = new Date('2020-06-01T00:00:00.000Z');

test('returns domain for band scale', () => {
  const scale = scaleBand().domain(domain);

  expect(getScaleValues(scale)).toEqual(domain);
});

test('returns ticks for linear scale', () => {
  const scale = scaleLinear()
    .range([0, 10])
    .domain([0, 10]);

  expect(getScaleValues(scale)).toMatchSnapshot();
});

test('apply "timeModifier" for month precision', () => {
  const scale = scaleUtc()
    .range([0, 10])
    .domain([firstDate, lastDate]);

  expect(
    getScaleValues(scale, { type: 'time', precision: 'month' })
  ).toMatchSnapshot();
});

test('apply "timeModifier" for minute precision', () => {
  const scale = scaleUtc()
    .range([0, 10])
    .domain([
      new Date('2020-01-06T15:00:00.000Z'),
      new Date('2020-01-06T15:10:00.000Z'),
    ]);

  expect(
    getScaleValues(scale, { type: 'time', precision: 'minute' })
  ).toMatchSnapshot();
});

test('apply "timeModifier" for week precision', () => {
  const scale = scaleUtc()
    .range([0, 10])
    .domain([
      new Date('2020-01-01T15:00:00.000Z'),
      new Date('2020-01-30T15:00:00.000Z'),
    ]);

  expect(
    getScaleValues(scale, { type: 'time', precision: 'week' })
  ).toMatchSnapshot();
});

test('apply "timeModifier" for year precision', () => {
  const scale = scaleUtc()
    .range([0, 10])
    .domain([
      new Date('2015-01-01T00:00:00.000Z'),
      new Date('2020-06-01T00:00:00.000Z'),
    ]);

  expect(
    getScaleValues(scale, { type: 'time', precision: 'year' })
  ).toMatchSnapshot();
});

test('returns ticks for UTC scale wtesthout applying time precision', () => {
  const scale = scaleUtc()
    .range([0, 10])
    .domain([firstDate, lastDate]);

  expect(getScaleValues(scale)).toMatchSnapshot();
});
