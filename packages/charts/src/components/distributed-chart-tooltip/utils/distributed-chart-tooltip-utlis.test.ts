import { getSelectors } from '../index';

describe('@keen.io/charts', () => {
  describe('getSelectors()', () => {
    const keys = ['books', 'cars', 'pencils'];
    const selector = { selector: [1, 'books'], color: 'red' };

    const colors = ['red', 'green', 'blue'];

    it('should return array with single "DateSelector" object', () => {
      const selectors = getSelectors({
        keys,
        colors,
        selector,
        disabledKeys: [],
        groupMode: 'grouped',
      });

      expect(selectors).toEqual([selector]);
    });

    it('should return array with multiple "DateSelector" objects', () => {
      const selectors = getSelectors({
        keys,
        selector,
        colors,
        groupMode: 'stacked',
        disabledKeys: [],
      });

      const result = [
        { selector: [1, 'books'], color: 'red' },
        { selector: [1, 'cars'], color: 'green' },
        { selector: [1, 'pencils'], color: 'blue' },
      ];

      expect(selectors).toEqual(result);
    });

    it('should return array with filtered "DateSelector" objects', () => {
      const selectors = getSelectors({
        keys,
        selector,
        colors,
        groupMode: 'stacked',
        disabledKeys: ['books', 'cars'],
      });

      const result = [{ selector: [1, 'pencils'], color: 'blue' }];

      expect(selectors).toEqual(result);
    });
  });
});
