import { Step } from '../../types';

import { KEEN_KEY, KEEN_VALUE } from '../../constants';

/**
 * Transforms results of funnel analysis.
 *
 * @param steps - Keen API steps settings
 * @param result - Funnel steps results
 * @return transformed funnel steps
 *
 */
export const transformFunnel = ({
  steps,
  result,
}: {
  steps: Step[];
  result: number[];
}) => ({
  results: steps.map(({ event_collection }: Step, idx: number) => ({
    [KEEN_KEY]: event_collection,
    [KEEN_VALUE]: result[idx],
  })),
  keys: [KEEN_VALUE],
});
