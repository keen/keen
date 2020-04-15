import { scaleBand, scaleLinear, scaleUtc } from 'd3-scale';

import {
  generateTicks,
  getScaleValues,
  getCenterPosition,
  EDGE_TICK_ALIGN,
} from './scale.utils';

import { Orientation } from '../types';

describe('@keen.io/charts - scale utils', () => {
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

  describe('getScaleValues()', () => {
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

    it('should apply "timeModifier" for month precision', () => {
      const scale = scaleUtc()
        .range([0, 10])
        .domain([firstDate, lastDate]);

      expect(
        getScaleValues(scale, { type: 'time', precision: 'month' })
      ).toMatchSnapshot();
    });

    it('should apply "timeModifier" for minute precision', () => {
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

    it('should apply "timeModifier" for week precision', () => {
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

    it('should apply "timeModifier" for year precision', () => {
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

    it('should return ticks for UTC scale without applying time precision', () => {
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

  describe('generateTicks()', () => {
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
        orientation: Orientation.HORIZONTAL,
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
        orientation: Orientation.VERTICAL,
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
        orientation: Orientation.VERTICAL,
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
        orientation: Orientation.HORIZONTAL,
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
        orientation: Orientation.VERTICAL,
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
});
