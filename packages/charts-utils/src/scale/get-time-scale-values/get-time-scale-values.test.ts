import { scaleTime } from 'd3-scale';
import {
  utcDay,
  timeDay,
  timeMinute,
  utcMinute,
  timeMonth,
  utcMonth,
  utcWeek,
  timeWeek,
  timeHour,
  utcHour,
  timeYear,
  utcYear,
} from 'd3-time';

import getTimeScaleValues from './get-time-scale-values';

jest.mock('d3-time');

const FIRST_DATE = new Date('2020-01-01T00:00:00.000Z');
const LAST_DATE = new Date('2020-06-01T00:00:00.000Z');

const scale = scaleTime()
  .range([0, 10])
  .domain([FIRST_DATE, LAST_DATE]);

test('calls time modifier with scale steps range', () => {
  const stepRange = 10;
  utcDay.range = jest.fn().mockReturnValue([]);

  getTimeScaleValues(scale, {
    type: 'time',
    precision: 'day',
    useUTC: true,
    stepRange,
  });

  expect(utcDay.range).toHaveBeenCalledWith(FIRST_DATE, LAST_DATE, stepRange);
});

test('calculates time range for "day" precision in UTC time', () => {
  utcDay.range = jest.fn().mockReturnValue([]);
  getTimeScaleValues(scale, { type: 'time', precision: 'day', useUTC: true });

  expect(utcDay.range).toHaveBeenCalled();
});

test('calculates time range for "day" precision in local time', () => {
  timeDay.range = jest.fn().mockReturnValue([]);
  getTimeScaleValues(scale, { type: 'time', precision: 'day' });

  expect(timeDay.range).toHaveBeenCalled();
});

test('calculates time range for "minute" precision in UTC time', () => {
  utcMinute.range = jest.fn().mockReturnValue([]);
  getTimeScaleValues(scale, {
    type: 'time',
    precision: 'minute',
    useUTC: true,
  });

  expect(utcMinute.range).toHaveBeenCalled();
});

test('calculates time range for "minute" precision in local time', () => {
  timeMinute.range = jest.fn().mockReturnValue([]);
  getTimeScaleValues(scale, { type: 'time', precision: 'minute' });

  expect(timeMinute.range).toHaveBeenCalled();
});

test('calculates time range for "month" precision in UTC time', () => {
  utcMonth.range = jest.fn().mockReturnValue([]);
  getTimeScaleValues(scale, { type: 'time', precision: 'month', useUTC: true });

  expect(utcMonth.range).toHaveBeenCalled();
});

test('calculates time range for "month" precision in local time', () => {
  timeMonth.range = jest.fn().mockReturnValue([]);
  getTimeScaleValues(scale, { type: 'time', precision: 'month' });

  expect(timeMonth.range).toHaveBeenCalled();
});

test('calculates time range for "week" precision in UTC time', () => {
  utcWeek.range = jest.fn().mockReturnValue([]);
  getTimeScaleValues(scale, { type: 'time', precision: 'week', useUTC: true });

  expect(utcWeek.range).toHaveBeenCalled();
});

test('calculates time range for "week" precision in local time', () => {
  timeWeek.range = jest.fn().mockReturnValue([]);
  getTimeScaleValues(scale, { type: 'time', precision: 'week' });

  expect(timeWeek.range).toHaveBeenCalled();
});

test('calculates time range for "hour" precision in UTC time', () => {
  utcHour.range = jest.fn().mockReturnValue([]);
  getTimeScaleValues(scale, { type: 'time', precision: 'hour', useUTC: true });

  expect(utcHour.range).toHaveBeenCalled();
});

test('calculates time range for "hour" precision in local time', () => {
  timeHour.range = jest.fn().mockReturnValue([]);
  getTimeScaleValues(scale, { type: 'time', precision: 'hour' });

  expect(timeHour.range).toHaveBeenCalled();
});

test('calculates time range for "year" precision in UTC time', () => {
  utcYear.range = jest.fn().mockReturnValue([]);
  getTimeScaleValues(scale, { type: 'time', precision: 'year', useUTC: true });

  expect(utcYear.range).toHaveBeenCalled();
});

test('calculates time range for "year" precision in local time', () => {
  timeYear.range = jest.fn().mockReturnValue([]);
  getTimeScaleValues(scale, { type: 'time', precision: 'year' });

  expect(timeYear.range).toHaveBeenCalled();
});
