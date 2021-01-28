import { Step } from '@keen.io/query';

import { KEEN_KEY, KEEN_VALUE } from '../../constants';

/**
 * Transforms results of funnel analysis.
 *
 * @param parserInput - Parser input properties
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
  data: steps.map(
    ({ event_collection: eventCollection }: Step, idx: number) => ({
      [KEEN_KEY]: eventCollection,
      [KEEN_VALUE]: result[idx],
    })
  ),
  keys: [KEEN_VALUE],
});
