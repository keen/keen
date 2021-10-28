import { convertSecondsToHours } from './convert-seconds-to-hours';

test('should return correct value', () => {
  const result = convertSecondsToHours(14000);

  expect(result).toEqual(3.888888888888889);
});
