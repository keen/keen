import formatValue from './format-value';
import formatByPattern from '../format-by-pattern';

jest.mock('../format-by-pattern');

test('applies format function', () => {
  const formatter = jest.fn();
  formatValue(100, formatter);

  expect(formatter).toHaveBeenCalledWith(100);
});

test('formats value based on provided pattern', () => {
  const formatter = '${number; 0.00}£';
  formatValue(1000, formatter);

  expect(formatByPattern).toHaveBeenCalledWith(formatter, 1000);
});

test('returns value without applying formatter', () => {
  const result = formatValue('United States', undefined);

  expect(result).toEqual('United States');
});
