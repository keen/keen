import {
  generateMetic,
  calculatePercentDifference,
  setStatus,
} from './metric.utils';

describe('@keen.io/charts - <MetricChart /> utils', () => {
  describe('generateMetic()', () => {
    it('should create metric for single data series', () => {
      const data = [{ name: 'Unique visitors', value: 100 }];
      const result = generateMetic({
        type: 'compare',
        keys: ['value'],
        labelSelector: 'name',
        data,
      });

      expect(result).toMatchInlineSnapshot(`
        Object {
          "value": 100,
        }
      `);
    });

    it('should create "compare" metric for multiple data series', () => {
      const data = [
        { name: 'January', value: 100 },
        { name: 'Febuary', value: 120 },
      ];
      const result = generateMetic({
        type: 'compare',
        keys: ['value'],
        labelSelector: 'name',
        data,
      });

      expect(result).toMatchInlineSnapshot(`
        Object {
          "difference": Object {
            "status": "increase",
            "value": 100,
          },
          "value": 120,
        }
      `);
    });

    it('should create "percent" metric for multiple data series', () => {
      const data = [
        { name: 'January', value: 100 },
        { name: 'Febuary', value: 20 },
      ];
      const result = generateMetic({
        type: 'percent',
        keys: ['value'],
        labelSelector: 'name',
        data,
      });

      expect(result).toMatchInlineSnapshot(`
        Object {
          "difference": Object {
            "status": "decrease",
            "value": 80,
          },
          "value": 20,
        }
      `);
    });

    it('should create "difference" metric for multiple data series', () => {
      const data = [
        { name: 'January', value: 100 },
        { name: 'Febuary', value: 190 },
      ];
      const result = generateMetic({
        type: 'difference',
        keys: ['value'],
        labelSelector: 'name',
        data,
      });

      expect(result).toMatchInlineSnapshot(`
        Object {
          "difference": Object {
            "status": "increase",
            "value": 90,
          },
          "value": 190,
        }
      `);
    });
  });

  describe('setStatus()', () => {
    it('should set "increase" status', () => {
      const status = setStatus(0, 20);
      expect(status).toMatchInlineSnapshot(`"increase"`);
    });

    it('should set "static" status', () => {
      const status = setStatus(24, 24);
      expect(status).toMatchInlineSnapshot(`"static"`);
    });

    it('should set "decrease" status', () => {
      const status = setStatus(60, 20);
      expect(status).toMatchInlineSnapshot(`"decrease"`);
    });
  });

  describe('calculatePercentDifference()', () => {
    it('should calculate percent of number for "decrease"', () => {
      const result = calculatePercentDifference(24, 6);
      expect(result).toEqual(-75);
    });

    it('should calculate percent of number for "increase"', () => {
      const result = calculatePercentDifference(20, 40);
      expect(result).toEqual(100);
    });
  });
});
