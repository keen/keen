import { transformFromArray, transformFromNumber } from './transform.utils';

import { arrayValues } from './api.fixtures';

describe('@keen.io/parser - transform', () => {
  describe('transformFromNumber()', () => {
    it('should create structure for single "numeric" value', () => {
      const result = transformFromNumber(12);
      expect(result).toMatchSnapshot();
    });
  });

  describe('transformFromNumber()', () => {
    it('should create structure for multiple "collections" value', () => {
      const result = transformFromArray(arrayValues);
      expect(result).toMatchSnapshot();
    });
  });
});
