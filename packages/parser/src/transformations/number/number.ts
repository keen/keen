import { DEFAULT_NAME, KEEN_KEY, KEEN_VALUE } from '../../constants';

/**
 * Transforms single number result
 *
 * @param value - numeric value
 * @return structure for single numeric value
 *
 */
export const transformFromNumber = (value: number) => ({
  results: [{ [KEEN_KEY]: DEFAULT_NAME, [KEEN_VALUE]: value }],
  keys: [KEEN_VALUE],
});
