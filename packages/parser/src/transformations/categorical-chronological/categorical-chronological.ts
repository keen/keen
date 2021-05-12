import { Query } from '@keen.io/query';
import { convertDate } from '@keen.io/time-utils';

import { KEEN_KEY, KEEN_TABLE_INTERVAL } from '../../constants';

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
    query,
    result,
  }: {
    query?: Query;
    result: IntervalResult[];
  },
  {
    mergePropertiesOrder,
    fillEmptyIntervalsKeys,
    dateModifier,
  }: ParserSettings,
  visualization?: string
) => {
  let data: Record<string, any>[] = [];
  const keys: Set<string> = new Set();

  result.forEach((interval) => {
    const { timeframe, value } = interval as {
      timeframe: { start: string; end: string };
      value: GroupByResult[];
    };
    const intervalData: Record<string, any> = {};
    const intervalKeys: Set<string> = new Set();

    const enableTableFormatter =
      query?.analysis_type &&
      query?.event_collection &&
      visualization === 'table';

    if (enableTableFormatter) {
      const tableValue = `${query?.analysis_type}.${query?.event_collection}`;
      value.forEach(({ result, ...record }) => {
        Object.keys(record).forEach((name) => {
          intervalKeys.add(name as string);
          intervalData[name] = record[name];
          intervalData[tableValue] = result;
        });
        data.push({
          [KEEN_TABLE_INTERVAL]: convertDate(timeframe.start, dateModifier),
          ...intervalData,
        });
      });
    } else {
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

      data.push({
        [KEEN_KEY]: convertDate(timeframe.start, dateModifier),
        ...intervalData,
      });
    }
    intervalKeys.forEach((key) => keys.add(`${key}`));
  });

  if (fillEmptyIntervalsKeys) {
    data = fillWithEmptyKeys([...keys], data, 0);
  }

  return {
    data,
    keys: [...keys],
  };
};
