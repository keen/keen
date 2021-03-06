import formatByPattern from './format-by-pattern';

test('should replace value symbol with the value', () => {
  const pattern = '${}$';
  const value = 100;
  const result = formatByPattern(pattern, value);
  expect(result).toEqual('100$');
});

test('should recognize value symbol parameters and format the value accordingly', () => {
  const pattern = '${number; 0a} £';
  const value = 1000;
  const result = formatByPattern(pattern, value);
  expect(result).toEqual('1k £');
});

test('should return unformatted value if value symbol is not provided in the pattern', () => {
  const pattern = 'test';
  const value = 1000;
  const result = formatByPattern(pattern, value);
  expect(result).toEqual(value.toString());
});

test('should apply mathematical operation if available operation is provided and operation value is a number', () => {
  const pattern = '${number; 0.0; multiply; 20}';
  const value = 1000;
  const result = formatByPattern(pattern, value);
  expect(result).toEqual('20000.0');
});

test('should not apply mathematical operation if operation type is not supported', () => {
  const pattern = '${number; 0.0; test; 20}$';
  const value = 1000;
  const result = formatByPattern(pattern, value);
  expect(result).toEqual('1000.0$');
});

test('should not apply mathematical operation if operation value is not a number', () => {
  const pattern = '${number; 0.0; multiply; test}$';
  const value = 1000;
  const result = formatByPattern(pattern, value);
  expect(result).toEqual('1000.0$');
});
