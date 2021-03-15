import { getSelectors } from './tooltip.utils';

describe('getSelectors()', () => {
  const keys = ['books', 'cars', 'pencils'];
  const selector = { selector: [1, 'books'], color: 'red' };

  const colors = ['red', 'green', 'blue'];

  test('returns array with single "DateSelector" object', () => {
    const selectors = getSelectors({
      keys,
      colors,
      selector,
      disabledKeys: [],
      groupMode: 'grouped',
    });

    expect(selectors).toEqual([selector]);
  });

  test('returns array with multiple "DateSelector" objects', () => {
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

  test('returns array with filtered "DateSelector" objects', () => {
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
