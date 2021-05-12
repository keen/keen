import { Query } from '@keen.io/query';
import { convertDate } from '@keen.io/time-utils';

import { KEEN_TABLE_INTERVAL } from '../../../constants';

import { fillWithEmptyKeys } from '../../../utils';

import { IntervalResult, GroupByResult, ParserSettings } from '../../../types';

/**
 * Categorical transformation with chronological data dedicated for table chart
 *
 * @param parserInput - parser input properties
 * @param parserSettings - pasrser settings
 * @return transformed results
 *
 */

export const tableChartTransformation = (
  {
    query,
    result,
  }: {
    query: Pick<Query, 'analysis_type' | 'event_collection'>;
    result: IntervalResult[];
  },
  parserSettings: Pick<
    ParserSettings,
    'fillEmptyIntervalsKeys' | 'dateModifier'
  >
) => {
  let data: Record<string, any>[] = [];
  const keys: Set<string> = new Set();
  const { fillEmptyIntervalsKeys, dateModifier } = parserSettings;

  result.forEach((interval) => {
    const { timeframe, value } = interval as {
      timeframe: { start: string; end: string };
      value: GroupByResult[];
    };
    const intervalData: Record<string, any> = {};
    const intervalKeys: Set<string> = new Set();

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
