import getFromPath from './get-from-path';

test('extracts value from "Object" based on provided selector', () => {
  const person = {
    address: {
      city: 'New York',
    },
  };

  expect(getFromPath(person, ['address', 'city'])).toEqual('New York');
});

test('should extract value from "Array" based on provided selector', () => {
  const countries = [{ name: 'United States' }];

  expect(getFromPath(countries, [0, 'name'])).toEqual('United States');
});
