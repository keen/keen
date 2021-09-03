import { extractFormatterType } from './extract-formatter-type';

test('should recognize "number" data type in format pattern', () => {
  const pattern = '${number; 0a} £';

  expect(extractFormatterType(pattern)).toEqual('number');
});

test('should recognize "string" data type in format pattern', () => {
  const pattern = '${string} units';

  expect(extractFormatterType(pattern)).toEqual('string');
});

test('should recognize "datetime" data type in format pattern', () => {
  const pattern = '${datetime;hidden;hh:mm}';

  expect(extractFormatterType(pattern)).toEqual('datetime');
});

test('should return null for invalid pattern', () => {
  const pattern = '';

  expect(extractFormatterType(pattern)).toEqual(null);
});
