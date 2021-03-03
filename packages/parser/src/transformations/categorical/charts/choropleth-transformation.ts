import { GroupByResult, ParserSettings } from '../../../types';

import { KEEN_KEY, KEEN_VALUE, KEEN_ELEMENTS } from '../../../constants';

/**
 * Choropleth chart transformation used for multiple group by properties
 *
 * @param result - categorical results
 * @param parserSettings - parser settings
 * @return transformed results
 *
 */
export const choroplethChartTransformation = (
  result: GroupByResult[],
  _parserSettings: ParserSettings,
  groupBySettings: string[]
) => {
  const [geoKey, propertyKey] = groupBySettings;
  const parsedResults: Record<string, any> = {};

  result.forEach((record) => {
    const geoMatcher = record[geoKey];

    if (parsedResults[geoMatcher]) {
      parsedResults[geoMatcher] = {
        ...parsedResults[geoMatcher],
        [KEEN_VALUE]: parsedResults[geoMatcher][KEEN_VALUE] + record.result,
        [KEEN_ELEMENTS]: {
          ...parsedResults[geoMatcher][KEEN_ELEMENTS],
          [record[propertyKey]]: record.result,
        },
      };
    } else {
      parsedResults[geoMatcher] = {
        [KEEN_KEY]: geoMatcher,
        [KEEN_VALUE]: record.result,
        [KEEN_ELEMENTS]: {
          [record[propertyKey]]: record.result,
        },
      };
    }
  });

  return {
    data: Object.keys(parsedResults).map((keyName) => parsedResults[keyName]),
    keys: [KEEN_VALUE],
  };
};
