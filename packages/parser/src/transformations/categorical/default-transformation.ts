import { GroupByResult, ParserSettings } from '../../types';

import { mergePropertiesGroup } from '../../utils';

import { KEEN_KEY, KEEN_VALUE } from '../../constants';

/**
 * Default categorical transformation
 *
 * @param result - categorical results
 * @param parserSettings - parser settings
 * @return transformed results
 *
 */
export const defaultTransformation = (
  result: GroupByResult[],
  parserSettings: ParserSettings
) => {
  const { mergePropertiesOrder } = parserSettings;
  const data: Record<string, any>[] = [];
  const keys: Set<string> = new Set();

  result
    .map((groupedProperties) =>
      mergePropertiesGroup(groupedProperties, mergePropertiesOrder)
    )
    .forEach(({ result, ...properties }) => {
      Object.values(properties).forEach((property) => {
        data.push({ [KEEN_KEY]: property, [KEEN_VALUE]: result });
      });
    });

  keys.add(KEEN_VALUE);

  return {
    data,
    keys: [...keys],
  };
};
