import { scaleBand, scaleLinear } from 'd3-scale';

import {
  getZeroIntersectionVisibility,
  calculateZeroIntersection,
} from './zero-intersection.utils';

describe('@keen.io/charts', () => {
  describe('<ZeroIntersection /> - utils', () => {
    describe('getZeroIntersectionVisibility()', () => {
      it('should return true because scale domain and gridY.enabled for vertical', () => {
        const domain = ['January', 'February'];
        const xScale = scaleBand().range([0, 100]).domain(domain);
        const yScale = scaleLinear().range([0, 100]).domain([-10, 10]);

        const result = getZeroIntersectionVisibility(
          'vertical',
          xScale,
          yScale,
          false,
          true
        );
        expect(result).toBeTruthy();
      });

      it('should return true because scale domain and gridX.enabled for horizontal', () => {
        const domain = ['January', 'February'];
        const yScale = scaleBand().range([0, 100]).domain(domain);
        const xScale = scaleLinear().range([0, 100]).domain([-10, 10]);

        const result = getZeroIntersectionVisibility(
          'horizontal',
          xScale,
          yScale,
          true,
          false
        );
        expect(result).toBeTruthy();
      });

      it('should return false because of wrong scale domain for vertical', () => {
        const domain = ['January', 'February'];
        const xScale = scaleBand().range([0, 100]).domain(domain);
        const yScale = scaleLinear().range([0, 100]).domain([0, 10]);

        const result = getZeroIntersectionVisibility(
          'vertical',
          xScale,
          yScale,
          false,
          true
        );
        expect(result).toBeFalsy();
      });

      it('should return false because of falsy gridY.enabled for vertical', () => {
        const domain = ['January', 'February'];
        const xScale = scaleBand().range([0, 100]).domain(domain);
        const yScale = scaleLinear().range([0, 100]).domain([-10, 10]);

        const result = getZeroIntersectionVisibility(
          'vertical',
          xScale,
          yScale,
          true,
          false
        );
        expect(result).toBeFalsy();
      });

      it('should return false because of falsy gridX.enabled for horizontal', () => {
        const domain = ['January', 'February'];
        const yScale = scaleBand().range([0, 100]).domain(domain);
        const xScale = scaleLinear().range([0, 100]).domain([-10, 10]);

        const result = getZeroIntersectionVisibility(
          'horizontal',
          xScale,
          yScale,
          false,
          true
        );
        expect(result).toBeFalsy();
      });
    });

    describe('calculateZeroIntersection()', () => {
      const margins = { top: 10, right: 10, bottom: 10, left: 10 };
      const dimensions = {
        width: 100,
        height: 100,
      };

      it('should calculate line correctly for vertical', () => {
        const domain = ['January', 'February'];
        const xScale = scaleBand().range([0, 100]).domain(domain);
        const yScale = scaleLinear().range([0, 100]).domain([-10, 10]);

        const result = calculateZeroIntersection(
          'vertical',
          xScale,
          yScale,
          dimensions,
          margins
        );
        expect(result).toMatchInlineSnapshot(`
          Object {
            "x1": 10,
            "x2": 90,
            "y1": 50,
            "y2": 50,
          }
        `);
      });

      it('should calculate line correctly for horizontal', () => {
        const domain = ['January', 'February'];
        const yScale = scaleBand().range([0, 100]).domain(domain);
        const xScale = scaleLinear().range([0, 100]).domain([-10, 10]);

        const result = calculateZeroIntersection(
          'horizontal',
          xScale,
          yScale,
          dimensions,
          margins
        );
        expect(result).toMatchInlineSnapshot(`
          Object {
            "x1": 50,
            "x2": 50,
            "y1": 10,
            "y2": 90,
          }
        `);
      });
    });
  });
});
