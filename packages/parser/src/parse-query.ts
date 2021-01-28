import { createParserSettings } from './create-parser-settings';
import { TRANSFORMATIONS } from './transformations';

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

  try {
    const { transformation } = parserSettings;
    const transformationHandler = TRANSFORMATIONS[transformation];

    return transformationHandler(input, parserSettings, visualization);
  } catch (err) {
    console.error(err);
  }
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
