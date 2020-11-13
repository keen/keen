import getPrecisionForInterval from './get-precision-from-interval';

test('returns default precision', () => {
  const interval = '';
  const precision = getPrecisionForInterval(interval);

  expect(precision).toEqual('month');
});

test('returns minute precision', () => {
  const interval = 'minutely';
  const precision = getPrecisionForInterval(interval);

  expect(precision).toEqual('minute');
});

test('returns hour precision', () => {
  const interval = 'hourly';
  const precision = getPrecisionForInterval(interval);

  expect(precision).toEqual('hour');
});

test('returns day precision', () => {
  const interval = 'daily';
  const precision = getPrecisionForInterval(interval);

  expect(precision).toEqual('day');
});

test('returns week precision', () => {
  const interval = 'weekly';
  const precision = getPrecisionForInterval(interval);

  expect(precision).toEqual('week');
});

test('returns month precision', () => {
  const interval = 'monthly';
  const precision = getPrecisionForInterval(interval);

  expect(precision).toEqual('month');
});

test('returns year precision', () => {
  const interval = 'yearly';
  const precision = getPrecisionForInterval(interval);

  expect(precision).toEqual('year');
});

test('returns default precision for custom interval', () => {
  const interval = 'every_1_minute';
  const precision = getPrecisionForInterval(interval);

  expect(precision).toEqual('month');
});

test('returns minute precision for custom interval', () => {
  const interval = 'every_30_minutes';
  const precision = getPrecisionForInterval(interval);

  expect(precision).toEqual('minute');
});

test('returns hour precision for custom interval', () => {
  const interval = 'every_8_hours';
  const precision = getPrecisionForInterval(interval);

  expect(precision).toEqual('hour');
});

test('returns day precision for custom interval', () => {
  const interval = 'every_3_days';
  const precision = getPrecisionForInterval(interval);

  expect(precision).toEqual('day');
});

test('returns week precision for custom interval', () => {
  const interval = 'every_2_weeks';
  const precision = getPrecisionForInterval(interval);

  expect(precision).toEqual('week');
});

test('returns month precision for custom interval', () => {
  const interval = 'every_6_months';
  const precision = getPrecisionForInterval(interval);

  expect(precision).toEqual('month');
});

test('returns year precision for custom interval', () => {
  const interval = 'every_3_years';
  const precision = getPrecisionForInterval(interval);

  expect(precision).toEqual('year');
});
