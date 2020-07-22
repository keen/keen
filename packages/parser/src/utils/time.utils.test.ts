import { getPrecisionForInterval } from './time.utils';

describe('@keen.io/parser - time', () => {
  describe('getPrecisionForInterval()', () => {
    it('should return default precision', () => {
      const interval = '';
      const precision = getPrecisionForInterval(interval);

      expect(precision).toEqual('month');
    });
    it('should return minute precision', () => {
      const interval = 'minutely';
      const precision = getPrecisionForInterval(interval);

      expect(precision).toEqual('minute');
    });
    it('should return hour precision', () => {
      const interval = 'hourly';
      const precision = getPrecisionForInterval(interval);

      expect(precision).toEqual('hour');
    });
    it('should return day precision', () => {
      const interval = 'daily';
      const precision = getPrecisionForInterval(interval);

      expect(precision).toEqual('day');
    });
    it('should return week precision', () => {
      const interval = 'weekly';
      const precision = getPrecisionForInterval(interval);

      expect(precision).toEqual('week');
    });
    it('should return month precision', () => {
      const interval = 'monthly';
      const precision = getPrecisionForInterval(interval);

      expect(precision).toEqual('month');
    });
    it('should return year precision', () => {
      const interval = 'yearly';
      const precision = getPrecisionForInterval(interval);

      expect(precision).toEqual('year');
    });
    it('should return default precision for custom interval', () => {
      const interval = 'every_1_minute';
      const precision = getPrecisionForInterval(interval);

      expect(precision).toEqual('month');
    });
    it('should return minute precision for custom interval', () => {
      const interval = 'every_30_minutes';
      const precision = getPrecisionForInterval(interval);

      expect(precision).toEqual('minute');
    });
    it('should return hour precision for custom interval', () => {
      const interval = 'every_8_hours';
      const precision = getPrecisionForInterval(interval);

      expect(precision).toEqual('hour');
    });
    it('should return day precision for custom interval', () => {
      const interval = 'every_3_days';
      const precision = getPrecisionForInterval(interval);

      expect(precision).toEqual('day');
    });
    it('should return week precision for custom interval', () => {
      const interval = 'every_2_weeks';
      const precision = getPrecisionForInterval(interval);

      expect(precision).toEqual('week');
    });
    it('should return month precision for custom interval', () => {
      const interval = 'every_6_months';
      const precision = getPrecisionForInterval(interval);

      expect(precision).toEqual('month');
    });
    it('should return year precision for custom interval', () => {
      const interval = 'every_3_years';
      const precision = getPrecisionForInterval(interval);

      expect(precision).toEqual('year');
    });
  });
});
