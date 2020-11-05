import { transformIntervalsFromArray } from './intervals-array';

import { intervalResultFixture } from '../../api.fixtures';

import { AtomicResult } from '../../types';

test('transforms array of interval values', () => {
  const { value } = intervalResultFixture;
  const result = transformIntervalsFromArray(value as AtomicResult[]);

  expect(result).toEqual({
    data: {
      Africa: 1,
      Cracow: 3,
      Daegu: 12,
    },
    keys: new Set(['Africa', 'Cracow', 'Daegu']),
  });
});
