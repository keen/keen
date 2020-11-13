import { extractGroupBySettings } from './extract-group-by';

import { Query, ParserSettings } from './types';

export const createParserSettings = (query?: Query): ParserSettings => {
  let parserSettings: ParserSettings = {
    mergePropertiesOrder: null,
  };

  if (query) {
    const { group_by: groupBy } = query;
    if (groupBy) {
      parserSettings = {
        ...parserSettings,
        mergePropertiesOrder: extractGroupBySettings(groupBy),
      };
    }
  }

  return parserSettings;
};
