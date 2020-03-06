import { formatNumber, formatText } from './format.utils';

describe('@keen.io/charts - format utils', () => {
  describe('formatText()', () => {
    it('should apply "formatLabel" function from scale settings', () => {
      const value = 'lorem ipsum';
      const scaleSettings = {
        formatLabel: jest.fn().mockImplementation(() => 'formatted'),
      };

      expect(formatText(value, scaleSettings as any)).toMatchInlineSnapshot(
        `"formatted"`
      );
      expect(scaleSettings.formatLabel).toHaveBeenCalledWith(value);
    });

    it('should not apply formating', () => {
      const value = 50;
      const result = formatText(value);

      expect(result).toEqual(value);
    });
  });

  describe('formatNumber()', () => {
    it('should format "decimal" values', () => {
      const value = 0.253;
      expect(formatNumber(value)).toMatchInlineSnapshot(`"250m"`);
    });

    it('should format "dozens" values', () => {
      const value = 19;
      expect(formatNumber(value)).toMatchInlineSnapshot(`"19"`);
    });

    it('should format "hundreds" values', () => {
      const value = 134;
      expect(formatNumber(value)).toMatchInlineSnapshot(`"130"`);
    });

    it('should format "thousand" values', () => {
      const value = 1200;
      expect(formatNumber(value)).toMatchInlineSnapshot(`"1.2k"`);
    });

    it('should format "thousand" values with custom precision', () => {
      const value = 5244;
      expect(formatNumber(value, 3)).toMatchInlineSnapshot(`"5.24k"`);
    });

    it('should format "milion" values', () => {
      const value = 1200000;
      expect(formatNumber(value)).toMatchInlineSnapshot(`"1.2M"`);
    });
  });
});
