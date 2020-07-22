import { firstCapital } from './first-capital';

test('capitalizes first letter in word', () => {
  const result = firstCapital('category');
  expect(result).toEqual('Category');
});
