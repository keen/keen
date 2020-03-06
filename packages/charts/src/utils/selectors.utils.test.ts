import { getFromPath } from './selectors.utils';

describe('@keen.io/charts - selectors utils', () => {
  describe('getFromPath()', () => {
    it('should extract value based on provided selector', () => {
      const person = {
        address: {
          city: 'New York',
        },
      };

      expect(getFromPath(person, ['address', 'city'])).toEqual('New York');
    });

    it('should extract value from collections based on provided selector', () => {
      const countries = [{ name: 'United States' }];

      expect(getFromPath(countries, [0, 'name'])).toEqual('United States');
    });
  });
});
