import { utcParse, timeParse } from 'd3-time-format';

import normalizeDate from './normalize-date';

jest.mock('d3-time-format');

const date = '2020-01-01T15:30:00.000Z';

let mockDate;

beforeEach(() => {
  mockDate = {
    setSeconds: jest.fn(),
    setMinutes: jest.fn(),
    setHours: jest.fn(),
    setMonth: jest.fn(),
    setDate: jest.fn(),
    setYear: jest.fn(),
  };
});

test('calls "utcParse" to normalize date in UTC', () => {
  utcParse = jest.fn().mockReturnValue(() => new Date(date));
  normalizeDate(date, 'month', true);

  expect(utcParse).toHaveBeenCalled();
});

test('calls "timeParse" to normalize date in local time', () => {
  timeParse = jest.fn().mockReturnValue(() => new Date(date));
  normalizeDate(date, 'month', false);

  expect(timeParse).toHaveBeenCalled();
});

test('normalizes date with "month" precision', () => {
  const modifiers = [
    mockDate.setSeconds,
    mockDate.setMinutes,
    mockDate.setHours,
    mockDate.setDate,
  ];
  utcParse = jest.fn().mockReturnValue(() => mockDate);

  normalizeDate(date, 'month', true);

  modifiers.forEach(modifier => expect(modifier).toHaveBeenCalled());

  expect(mockDate.setMonth).not.toHaveBeenCalled();
  expect(utcParse).toHaveBeenCalled();
});

test('normalizes date with "day" precision', () => {
  const modifiers = [
    mockDate.setSeconds,
    mockDate.setMinutes,
    mockDate.setHours,
  ];
  utcParse = jest.fn().mockReturnValue(() => mockDate);

  normalizeDate(date, 'day', true);

  modifiers.forEach(modifier => expect(modifier).toHaveBeenCalled());

  expect(mockDate.setDate).not.toHaveBeenCalled();
  expect(utcParse).toHaveBeenCalled();
});

test('normalizes date with "hour" precision', () => {
  const modifiers = [mockDate.setSeconds, mockDate.setMinutes];
  utcParse = jest.fn().mockReturnValue(() => mockDate);

  normalizeDate(date, 'hour', true);

  modifiers.forEach(modifier => expect(modifier).toHaveBeenCalled());

  expect(mockDate.setHours).not.toHaveBeenCalled();
  expect(utcParse).toHaveBeenCalled();
});

test('normalizes date with "minute" precision', () => {
  const modifiers = [mockDate.setSeconds];
  utcParse = jest.fn().mockReturnValue(() => mockDate);

  normalizeDate(date, 'minute', true);

  modifiers.forEach(modifier => expect(modifier).toHaveBeenCalled());

  expect(mockDate.setMinutes).not.toHaveBeenCalled();
  expect(utcParse).toHaveBeenCalled();
});

test('normalizes date with "year" precision', () => {
  const modifiers = [
    mockDate.setSeconds,
    mockDate.setMinutes,
    mockDate.setHours,
    mockDate.setMonth,
  ];
  utcParse = jest.fn().mockReturnValue(() => mockDate);
  normalizeDate(date, 'year', true);

  modifiers.forEach(modifier => expect(modifier).toHaveBeenCalled());
  expect(utcParse).toHaveBeenCalled();
});
