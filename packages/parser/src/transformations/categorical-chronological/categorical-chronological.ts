import { Query, Timeframe } from '@keen.io/query';

import { KEEN_KEY } from '../../constants';

import { mergePropertiesGroup, fillWithEmptyKeys } from '../../utils';

import { IntervalResult, GroupByResult, ParserSettings } from '../../types';

/**
 * Transforms categorical data with chronological order.
 *
 * @param parserInput - Parser input properties
 * @return transformed results
 *
 */
export const transformCategoricalChronological = (
  {
    result,
  }: {
    query?: Query;
    result: IntervalResult[];
  },
  { mergePropertiesOrder, fillEmptyIntervalsKeys }: ParserSettings
) => {
  let data: Record<string, any>[] = [];
  const keys: Set<string> = new Set();

  result.forEach((interval) => {
    const { timeframe, value } = interval as {
      timeframe: Timeframe;
      value: GroupByResult[];
    };
    const intervalData: Record<string, any> = {};
    const intervalKeys: Set<string> = new Set();

    value
      .map((groupedProperties) =>
        mergePropertiesGroup(groupedProperties, mergePropertiesOrder)
      )
      .forEach(({ result, ...properties }) => {
        Object.values(properties).forEach((name) => {
          intervalKeys.add(name as string);
          intervalData[name] = result;
        });
      });

    data.push({ [KEEN_KEY]: timeframe.start, ...intervalData });
    intervalKeys.forEach((key) => keys.add(key));
  });

  if (fillEmptyIntervalsKeys) {
    data = fillWithEmptyKeys([...keys], data, 0);
  }

  return {
    data,
    keys: [...keys],
  };
};
