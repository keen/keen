import { truncate } from './string.utils';

describe('truncate()', () => {
  const text = 'This is very long text';
  test('should return full text if its length not exceeds maximum allowed text length', () => {
    const result = truncate(text, 22);
    expect(result).toEqual(text);
  });
  test('should truncate string when its length exceeds maximum allowed text length', () => {
    const result = truncate(text, 10);
    expect(result).toEqual('This is ve...');
  });
  test('should not truncate last word if only one of its letters will be visible', () => {
    const result = truncate(text, 9);
    expect(result).toEqual('This is...');
  });
});
