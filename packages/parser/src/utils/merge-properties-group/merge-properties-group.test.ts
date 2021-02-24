import { mergePropertiesGroup } from './merge-properties-group';

test('do not apply transformation for single grouped result', () => {
  const fixture = { result: 97, author: 'Edwidge Danticat' };

  expect(mergePropertiesGroup(fixture)).toEqual({
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

  expect(mergePropertiesGroup(fixture)).toEqual({
    'author-book': 'Edwidge Danticat | Shining',
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

  expect(mergePropertiesGroup(fixture, mergePropertiesOrder)).toEqual({
    'country-product-company': 'USA | MacBook Pro 13 | Apple',
    result: 120,
  });
});
