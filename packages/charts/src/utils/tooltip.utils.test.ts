import { formatTooltipValue } from './tooltip.utils';

describe('@keen.io/charts - tooltip utils', () => {
  describe('formatTooltipValue()', () => {
    it('should return value when format function is not provided', () => {
      const value = '1';
      const label = formatTooltipValue(value);

      expect(label).toEqual(value);
    });

    it('should return value when value is different than string or number', () => {
      const value = { a: 1 };
      const format = value => `$${value}`;
      const label = formatTooltipValue(value, format);

      expect(label).toEqual(value);
    });

    it('should call format callback for string', () => {
      const value = '1';
      const format = jest.fn();
      formatTooltipValue(value, format);

      expect(format).toHaveBeenCalled();
    });

    it('should call format callback for an object', () => {
      const value = { a: 1 };
      const format = jest.fn();
      formatTooltipValue(value, format);

      expect(format).not.toHaveBeenCalled();
    });

    it('should format value as string', () => {
      const value = '8';
      const format = value => `${value} item(s)`;
      const label = formatTooltipValue(value, format);

      expect(label).toEqual('8 item(s)');
    });

    it('should format value as number', () => {
      const value = 100;
      const format = value => `$${value}`;
      const label = formatTooltipValue(value, format);

      expect(label).toEqual('$100');
    });
  });
});
