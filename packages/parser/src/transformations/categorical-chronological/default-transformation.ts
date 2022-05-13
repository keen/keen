import { convertDate } from '@keen.io/time-utils';

import { KEEN_KEY } from '../../constants';

import { mergePropertiesGroup, fillWithEmptyKeys } from '../../utils';

import { IntervalResult, GroupByResult, ParserSettings } from '../../types';

/**
 * Default categorical-chronological transformation
 *
 * @param result - categorical results
 * @param parserSettings - parser settings
 * @return transformed results
 *
 */

export const defaultTransformation = (
  result: IntervalResult[],
  parserSettings: Omit<ParserSettings, 'transformation'>
) => {
  let data: Record<string, any>[] = [];
  const keys: Set<string> = new Set();
  const { mergePropertiesOrder, fillEmptyIntervalsKeys, dateModifier } =
    parserSettings;

  result.forEach((interval) => {
    const { timeframe, value } = interval as {
      timeframe: { start: string; end: string };
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

    data.push({
      [KEEN_KEY]: convertDate(timeframe.start, dateModifier),
      ...intervalData,
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
