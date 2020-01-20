import { scaleBand, scaleLinear, scaleUtc } from 'd3-scale';

import {
  getCenterPosition,
  getScaleValues,
  generateTicks,
  textFormat,
  calculateRange,
  EDGE_TICK_ALIGN,
} from './utils';

import { Orientation } from './types';

describe('@keen.io/charts - utils', () => {
  const domain = ['Sales', 'Marketing', 'E-commerce'];

  describe('calculateRange()', () => {
    const data = [
      { label: 'January', sale: -3, buy: 11, revenue: 30 },
      { label: 'February', sale: 12, buy: 3, revenue: 21 },
    ];

    it('should calculate minimum and maximum values for provided keys', () => {
      const { minimum, maximum } = calculateRange(data, 'auto', 'auto', [
        'sale',
        'revenue',
      ]);

      expect(minimum).toEqual(-3);
      expect(maximum).toEqual(30);
    });

    it('should return defined minimum and maximum values', () => {
      const minValue = -2;
      const maxValue = 10;

      const { minimum, maximum } = calculateRange([], minValue, maxValue, []);

      expect(minimum).toEqual(minValue);
      expect(maximum).toEqual(maxValue);
    });

    it('should return default value for minimum greater than 0', () => {
      const minValue = 3;
      const maxValue = 10;

      const { minimum } = calculateRange([], minValue, maxValue, []);

      expect(minimum).toEqual(0);
    });
  });

  describe('generateTicks()', () => {
    global.Date.UTC = jest
      .fn()
      .mockImplementationOnce(
        () => 'Wed Jan 01 2020 00:00:00 GMT+0000 (Coordinated Universal Time)'
      )
      .mockImplementationOnce(
        () => 'Sat Feb 01 2020 00:00:00 GMT+0000 (Coordinated Universal Time)'
      )
      .mockImplementationOnce(
        () => 'Sun Mar 01 2020 00:00:00 GMT+0000 (Coordinated Universal Time)'
      )
      .mockImplementationOnce(
        () => 'Wed Apr 01 2020 00:00:00 GMT+0000 (Coordinated Universal Time)'
      )
      .mockImplementationOnce(
        () => 'Fri May 01 2020 00:00:00 GMT+0000 (Coordinated Universal Time)'
      )
      .mockImplementationOnce(
        () => 'Mon Jun 01 2020 00:00:00 GMT+0000 (Coordinated Universal Time)'
      );

    const rangeStart = 0;
    const rangeEnd = 0;
    const tickSize = 10;
    const firstDate = new Date('2020-01-01T00:00:00.000Z');
    const lastDate = new Date('2020-06-01T00:00:00.000Z');

    it('should create additional ticks', () => {
      const scale = scaleBand()
        .range([rangeStart, rangeEnd])
        .domain(domain);
      const ticks = generateTicks({
        x: 0,
        y: 0,
        scale,
        tickSize,
      });

      expect(ticks.length).toEqual(5);
    });

    it('should create ticks for vertical linear scale', () => {
      const scale = scaleLinear()
        .range([rangeStart, rangeEnd])
        .domain([0, 90]);

      const ticks = generateTicks({
        x: 0,
        y: 0,
        scale,
        tickSize,
        orientation: Orientation.VERTICAL,
      });

      expect(ticks).toMatchSnapshot();
    });

    it('should create ticks for horizontal linear scale', () => {
      const scale = scaleLinear()
        .range([rangeStart, rangeEnd])
        .domain([0, 90]);

      const ticks = generateTicks({
        x: 0,
        y: 0,
        scale,
        tickSize,
        orientation: Orientation.HORIZONTAL,
      });

      expect(ticks).toMatchSnapshot();
    });

    it('should create ticks for horizontal Utc scale', () => {
      const scale = scaleUtc()
        .range([rangeStart, rangeEnd])
        .domain([firstDate, lastDate]);

      const ticks = generateTicks({
        x: 0,
        y: 0,
        scale,
        tickSize,
        orientation: Orientation.HORIZONTAL,
      });

      expect(ticks).toMatchSnapshot();
    });

    it('should create ticks for vertical band scale', () => {
      const scale = scaleBand()
        .range([rangeStart, rangeEnd])
        .domain(domain);

      const ticks = generateTicks({
        x: 0,
        y: 0,
        scale,
        tickSize,
        orientation: Orientation.VERTICAL,
      });

      expect(ticks).toMatchSnapshot();
    });

    it('should create ticks for horizontal band scale', () => {
      const scale = scaleBand()
        .range([rangeStart, rangeEnd])
        .domain(domain);

      const ticks = generateTicks({
        x: 0,
        y: 0,
        scale,
        tickSize,
        orientation: Orientation.HORIZONTAL,
      });

      expect(ticks).toMatchSnapshot();
    });

    it('should increase size of edge ticks', () => {
      const scale = scaleBand()
        .range([rangeStart, rangeEnd])
        .domain(domain);
      const ticks = generateTicks({
        x: 0,
        y: 0,
        scale,
        tickSize,
      });

      const edgeTicks = ticks.slice(ticks.length - 2, ticks.length);
      edgeTicks.forEach(({ size }) => {
        expect(size).toEqual(tickSize + EDGE_TICK_ALIGN);
      });
    });
  });

  describe('getScaleValues()', () => {
    global.Date.UTC = jest
      .fn()
      .mockImplementationOnce(
        () => 'Wed Jan 01 2020 00:00:00 GMT+0000 (Coordinated Universal Time)'
      )
      .mockImplementationOnce(
        () => 'Mon Jun 01 2020 00:00:00 GMT+0000 (Coordinated Universal Time)'
      );
    const firstDate = new Date('2020-01-01T00:00:00.000Z');
    const lastDate = new Date('2020-06-01T00:00:00.000Z');
    it('should return domain for band scale', () => {
      const scale = scaleBand().domain(domain);

      expect(getScaleValues(scale)).toEqual(domain);
    });

    it('should return ticks for linear scale', () => {
      const scale = scaleLinear()
        .range([0, 10])
        .domain([0, 10]);

      expect(getScaleValues(scale)).toMatchSnapshot();
    });

    it('should return ticks for Utc scale', () => {
      const scale = scaleUtc()
        .range([0, 10])
        .domain([firstDate, lastDate]);

      expect(getScaleValues(scale)).toMatchSnapshot();
    });
  });

  describe('getCenterPosition()', () => {
    it('should calculate center position for element in scale', () => {
      const scale = scaleBand()
        .range([0, 120])
        .domain(domain);

      const positionCalculator = getCenterPosition(scale);

      expect(positionCalculator('Sales')).toEqual(20);
      expect(positionCalculator('Marketing')).toEqual(60);
      expect(positionCalculator('E-commerce')).toEqual(100);
    });
  });

  describe('textFormat()', () => {
    global.Date.UTC = jest
      .fn()
      .mockImplementationOnce(
        () => 'Wed Jan 01 2020 00:00:00 GMT+0000 (Coordinated Universal Time)'
      );

    it('return value without formating', () => {
      const value = 50;
      const returnValue = textFormat(value);

      expect(returnValue).toEqual(50);
    });
    it('return string when value is Date', () => {
      const value = new Date('2020-01-01T00:00:00.000Z');
      const returnValue = textFormat(value);

      expect(returnValue).toEqual(
        'Wed Jan 01 2020 01:00:00 GMT+0100 (Central European Standard Time)'
      );
    });
    it('return formatted value', () => {
      const value = 123;
      const formatLabel = label => `$${label}`;
      const returnValue = textFormat(value, formatLabel);

      expect(returnValue).toEqual('$123');
    });
  });
});
