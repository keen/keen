import { createLabelFormatter } from './date.utils';

describe('@keen.io/parser - date', () => {
  const date = '2019-01-01T00:00:00.000-00:00';

  describe('createLabelFormatter()', () => {
    it('should fallback to "month" precision formatter', () => {
      const format = createLabelFormatter('not-supported-precision');

      expect(format(date)).toMatchInlineSnapshot(`"Jan 19"`);
    });

    it('should create formatter for "day" precision', () => {
      const format = createLabelFormatter('day');

      expect(format(date)).toMatchInlineSnapshot(`"Jan Tue 19"`);
    });

    it('should create formatter for "week" precision', () => {
      const format = createLabelFormatter('week');

      expect(format(date)).toMatchInlineSnapshot(`"01 Tue"`);
    });

    it('should create formatter for "month" precision', () => {
      const format = createLabelFormatter('month');

      expect(format(date)).toMatchInlineSnapshot(`"Jan 19"`);
    });

    it('should create formatter for "year" precision', () => {
      const format = createLabelFormatter('year');

      expect(format(date)).toMatchInlineSnapshot(`"Jan, 2019"`);
    });
  });
});
