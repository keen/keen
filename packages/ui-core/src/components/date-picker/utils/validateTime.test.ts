import { validateTime } from './validateTime';

test('should validate incorrect values in hours and minutes', () => {
  const time = '55:77';
  const result = validateTime(time);

  expect(result).toEqual(false);
});

test('should validate incorrect pattern', () => {
  const time = '1234-5689';
  const result = validateTime(time);

  expect(result).toEqual(false);
});

test('should validate incorrect time in HH:mm format', () => {
  const time = '12:78';
  const result = validateTime(time);

  expect(result).toEqual(false);
});

test('should validate correct time in HH:mm format', () => {
  const time = '10:20';
  const result = validateTime(time);

  expect(result).toEqual(true);
});
