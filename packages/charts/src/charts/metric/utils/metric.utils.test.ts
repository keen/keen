import {
  generateMetric,
  calculatePercentDifference,
  setStatus,
} from './metric.utils';

describe('@keen.io/charts - <MetricChart /> utils', () => {
  describe('generateMetric()', () => {
    it('should create metric for single data series', () => {
      const data = [{ name: 'Unique visitors', value: 100 }];
      const result = generateMetric({
        type: 'comparison',
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
      const result = generateMetric({
        type: 'comparison',
        keys: ['value'],
        labelSelector: 'name',
        data,
      });

      expect(result).toMatchInlineSnapshot(`
        Object {
          "difference": Object {
            "status": "increase",
            "value": 20,
          },
          "previousValue": 100,
          "value": 120,
        }
      `);
    });

    it('should create "percent" metric for multiple data series', () => {
      const data = [
        { name: 'January', value: 100 },
        { name: 'Febuary', value: 20 },
      ];
      const result = generateMetric({
        type: 'difference',
        usePercentDifference: true,
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
          "previousValue": 100,
          "value": 20,
        }
      `);
    });

    it('should create "difference" metric for multiple data series', () => {
      const data = [
        { name: 'January', value: 100 },
        { name: 'Febuary', value: 190 },
      ];
      const result = generateMetric({
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
          "previousValue": 100,
          "value": 190,
        }
      `);
    });

    it('should create "difference" metric with 0 difference value when previous result is 0', () => {
      const data = [
        { name: 'January', value: 0 },
        { name: 'Febuary', value: 190 },
      ];
      const result = generateMetric({
        type: 'difference',
        usePercentDifference: true,
        keys: ['value'],
        labelSelector: 'name',
        data,
      });

      expect(result).toMatchInlineSnapshot(`
        Object {
          "difference": Object {
            "status": "increase",
            "value": 0,
          },
          "previousValue": 0,
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
