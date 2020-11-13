import { transformAtomicResult } from './atomic-result';

test('do not apply transformation for single grouped result', () => {
  const fixture = { result: 97, author: 'Edwidge Danticat' };

  expect(transformAtomicResult(fixture)).toEqual({
    author: 'Edwidge Danticat',
    result: 97,
  });
});

test('merge properties for multiple grouped result', () => {
  const fixture = {
    result: 97,
    author: 'Edwidge Danticat',
    book: 'Shining',
  };

  expect(transformAtomicResult(fixture)).toEqual({
    'author-book': 'Edwidge Danticat Shining',
    result: 97,
  });
});

test('merge multiple properties based on provided order', () => {
  const mergePropertiesOrder = ['country', 'product', 'company'];
  const fixture = {
    result: 120,
    company: 'Apple',
    product: 'MacBook Pro 13',
    country: 'USA',
  };

  expect(transformAtomicResult(fixture, mergePropertiesOrder)).toEqual({
    'country-product-company': 'USA MacBook Pro 13 Apple',
    result: 120,
  });
});
