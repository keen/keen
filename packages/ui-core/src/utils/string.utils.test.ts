import { truncate } from './string.utils';

describe('truncate()', () => {
  const text = 'This is very long text';
  test('should return full text if its length not exceeds maximum allowed text length', () => {
    const { isTruncated, value } = truncate(text, 22);
    expect(value).toEqual(text);
    expect(isTruncated).toEqual(false);
  });
  test('should truncate the string when its length exceeds maximum allowed text length', () => {
    const { isTruncated, value } = truncate(text, 10);
    expect(value).toEqual('This is ve...');
    expect(isTruncated).toEqual(true);
  });
  test('should not truncate the last word if only one of its letters will be visible', () => {
    const { isTruncated, value } = truncate(text, 9);
    expect(value).toEqual('This is...');
    expect(isTruncated).toEqual(true);
  });
});
