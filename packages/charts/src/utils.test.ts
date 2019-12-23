import { scaleBand, scaleLinear } from 'd3-scale';

import {
  getCenterPosition,
  getScaleValues,
  generateTicks,
  EDGE_TICK_ALIGN,
} from './utils';

import { Orientation } from './types';

describe('@keen/charts - utils', () => {
  const domain = ['Sales', 'Marketing', 'E-commerce'];

  describe('generateTicks()', () => {
    const rangeStart = 0;
    const rangeEnd = 0;
    const tickSize = 10;

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
});
