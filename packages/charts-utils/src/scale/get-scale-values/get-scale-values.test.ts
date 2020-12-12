import { scaleBand, scaleLinear, scaleTime, scaleUtc } from 'd3-scale';

import { normalizeDate } from '../../time';

import getScaleValues from './get-scale-values';

const domain = ['Sales', 'Marketing', 'E-commerce'];

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
  const firstDate = normalizeDate('2020-01-06T15:00:00.000Z', 'month', true);
  const lastDate = normalizeDate('2020-08-06T15:30:00.000Z', 'month', true);

  const scale = scaleTime()
    .range([0, 10])
    .domain([firstDate, lastDate]);

  expect(
    getScaleValues(scale, { type: 'time', precision: 'month' }, true)
  ).toMatchSnapshot();
});

test('apply "timeModifier" for minute precision', () => {
  const firstDate = normalizeDate('2020-01-06T15:00:00.000Z', 'minute', true);
  const lastDate = normalizeDate('2020-01-06T15:10:00.000Z', 'minute', true);

  const scale = scaleUtc()
    .range([0, 10])
    .domain([firstDate, lastDate]);

  expect(
    getScaleValues(scale, { type: 'time', precision: 'minute' }, true)
  ).toMatchSnapshot();
});

test('apply "timeModifier" for week precision', () => {
  const firstDate = normalizeDate('2020-01-01T15:00:00.000Z', 'week', true);
  const lastDate = normalizeDate('2020-01-30T15:00:00.000Z', 'week', true);

  const scale = scaleUtc()
    .range([0, 10])
    .domain([firstDate, lastDate]);

  expect(
    getScaleValues(scale, { type: 'time', precision: 'week' }, true)
  ).toMatchSnapshot();
});

test('apply "timeModifier" for year precision', () => {
  const firstDate = normalizeDate('2015-01-01T00:00:00.000Z', 'year', true);
  const lastDate = normalizeDate('2020-06-01T00:00:00.000Z', 'year', true);

  const scale = scaleUtc()
    .range([0, 10])
    .domain([firstDate, lastDate]);

  expect(
    getScaleValues(scale, { type: 'time', precision: 'year' }, true)
  ).toMatchSnapshot();
});
