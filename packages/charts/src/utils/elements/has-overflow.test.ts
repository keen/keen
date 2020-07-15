import { hasOverflow } from './has-overflow';

test('should return "true" for horizontal overflow', () => {
  const htmlElement = {
    offsetWidth: 100,
    scrollWidth: 150,
  } as HTMLElement;

  expect(hasOverflow('horizontal', htmlElement)).toBeTruthy();
});

test('should return "false" for no horizontal overflow', () => {
  const htmlElement = {
    offsetWidth: 100,
    scrollWidth: 100,
  } as HTMLElement;

  expect(hasOverflow('horizontal', htmlElement)).toBeFalsy();
});

test('should return "true" for vertical overflow', () => {
  const htmlElement = {
    offsetHeight: 80,
    scrollHeight: 100,
  } as HTMLElement;

  expect(hasOverflow('vertical', htmlElement)).toBeTruthy();
});

test('should return "false" for no vertical overflow', () => {
  const htmlElement = {
    offsetHeight: 100,
    scrollHeight: 100,
  } as HTMLElement;

  expect(hasOverflow('vertical', htmlElement)).toBeFalsy();
});
