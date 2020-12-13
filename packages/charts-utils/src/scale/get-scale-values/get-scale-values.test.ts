import { scaleBand, scaleLinear, scaleTime } from 'd3-scale';

import getScaleValues from './get-scale-values';
import getTimeScaleValues from '../get-time-scale-values';

jest.mock('../get-time-scale-values');

import { ScaleSettings } from '../../types';

const domain = ['Sales', 'Marketing', 'E-commerce'];

beforeEach(() => {
  getTimeScaleValues.mockReset();
});

test('returns domain for scale band', () => {
  const scale = scaleBand().domain(domain);

  expect(getScaleValues(scale)).toEqual(domain);
});

test('get values from "linear" scale', () => {
  const scale = scaleLinear()
    .range([0, 10])
    .domain([0, 10]);

  expect(getScaleValues(scale)).toMatchSnapshot();
});

test('calls "getTimeScaleValues()" to generate time scale values', () => {
  const firstDate = new Date('2020-01-06T15:00:00.000Z');
  const lastDate = new Date('2020-08-06T15:30:00.000Z');

  const scale = scaleTime()
    .range([0, 10])
    .domain([firstDate, lastDate]);

  const scaleSettings: ScaleSettings = { type: 'time', precision: 'month' };

  getScaleValues(scale, scaleSettings);

  expect(getTimeScaleValues).toHaveBeenCalledWith(scale, scaleSettings);
});
