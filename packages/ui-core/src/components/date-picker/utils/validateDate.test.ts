import { validateDate } from './validateDate';

test('should validate incorrect values in months and days', () => {
  const date = '1234-56-78';
  const result = validateDate(date);

  expect(result).toEqual(false);
});

test('should validate incorrect pattern', () => {
  const date = '1234-5689-0000';
  const result = validateDate(date);

  expect(result).toEqual(false);
});

test('should validate incorrect date in YYYY-MM-DD format', () => {
  const date = '2010-02-30';
  const result = validateDate(date);

  expect(result).toEqual(false);
});

test('should validate correct date in YYYY-MM-DD format', () => {
  const date = '2010-02-01';
  const result = validateDate(date);

  expect(result).toEqual(true);
});
