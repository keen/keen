import { createParserSettings } from './create-parser-settings';
import { TRANSFORMATIONS } from './transformations';

import { PREFIX } from './constants';

import { ParserInput } from './types';

/**
 * Prepare analysis results for specified visualization.
 *
 * @param input - Parser input properties
 * @param visualization - chart type
 * @return transformed data
 *
 */
export const parseQuery = (input: ParserInput, visualization?: string) => {
  const { query, steps } = input;
  const parserSettings = createParserSettings(query, steps);

  const { transformation } = parserSettings;
  const transformationHandler = TRANSFORMATIONS[transformation];

  if (transformationHandler) {
    try {
      return transformationHandler(input, parserSettings, visualization);
    } catch (err) {
      console.error(`${PREFIX} - analysis results cannot be transformed`);
    }
  } else {
    console.error(`${PREFIX} - the provided data cannot be classified`);
  }

  return {
    keys: [],
    data: [],
  };
};

/**
 * Prepare multiple analysis results for specified visualization.
 *
 * @param input - Parser input properties
 * @param visualization - chart type
 * @return transformed data
 *
 */
export const parseQueries = (input: ParserInput[], visualization?: string) =>
  input.map((analysys) => parseQuery(analysys, visualization));