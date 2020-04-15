import {
  transformIntervalsFromArray,
  transformFromNumber,
  transformAtomicResult,
} from './transform.utils';

import { KEEN_KEY, KEEN_VALUE } from '../constants';

import { AtomicResult } from '../types';

import { intervalResultFixture } from '../api.fixtures';

describe('@keen.io/parser - transform', () => {
  describe('transformAtomicResult()', () => {
    it('should not apply transform for single grouped result', () => {
      const fixture = { result: 97, author: 'Edwidge Danticat' };

      expect(transformAtomicResult(fixture)).toEqual({
        author: 'Edwidge Danticat',
        result: 97,
      });
    });

    it('should merge properties for grouped result', () => {
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
  });

  describe('transformIntervalsFromArray()', () => {
    it('should create structure for interval "array" values', () => {
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
  });

  describe('transformFromNumber()', () => {
    it('should create structure for "numeric" value', () => {
      const result = transformFromNumber(12);
      expect(result).toEqual({
        keys: [KEEN_VALUE],
        results: [{ [KEEN_KEY]: 'Result', [KEEN_VALUE]: 12 }],
      });
    });
  });
});
