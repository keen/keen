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

test('should format date in iso', () => {
  const pattern = '${datetime;YYYY; hh:mm}';
  const value = '2021-07-17T00:00:00.000+01:00';
  const result = formatByPattern(pattern, value);
  expect(result).toEqual('2021 11:00');
});

test('should format date in iso', () => {
  const pattern = '${datetime;YYYY-MM-DD; HH:mm}';
  const value = '2021-07-17T00:00:00.000+01:00';
  const result = formatByPattern(pattern, value);
  expect(result).toEqual('2021-07-16 23:00');
});

test('should format time in UTC', () => {
  const pattern = '${datetime;hidden;hh:mm}';
  const value = '2021-07-17T00:00:00.000Z';
  const result = formatByPattern(pattern, value);
  expect(result).toEqual('12:00');
});

test('should format time in linux timestamp', () => {
  const pattern = '${datetime;YYYY-MM-DD; HH:mm}';
  const value = '1630487135';
  const result = formatByPattern(pattern, value);
  expect(result).toEqual('2021-09-01 09:05');
});

test('Should hide time when hidden option is specified', () => {
  const pattern = '${datetime;YYYY-MM-DD; hidden}';
  const value = '2021-07-17T00:00:00.000Z';
  const result = formatByPattern(pattern, value);
  expect(result).toEqual('2021-07-17');
});

test('Should keep datetime unchanged when neither date nor time format provided', () => {
  const pattern = '${datetime}';
  const value = '2020-12-02T04:02:34-06:00';
  const result = formatByPattern(pattern, value);
  expect(result).toEqual('2020-12-02T04:02:34-06:00');
});

test('should apply mathematical operation if available operation is provided and operation value is floating point number', () => {
  const pattern = '${number; 0.00; add; 20.12}';
  const value = '20.23';
  const result = formatByPattern(pattern, value);
  expect(result).toEqual('40.35');
});
