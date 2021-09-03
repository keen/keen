import { VARIABLE_REGEX } from '../constants';

import { PatternFormatterDataType } from '../../../types';

/**
 * Get data type from string format pattern.
 *
 * @param pattern - format pattern
 * @return formatter data type
 *
 */
export const extractFormatterType = (
  pattern: string
): PatternFormatterDataType => {
  const variable = pattern.match(VARIABLE_REGEX);
  if (variable) {
    const [variableType] = variable[1].split(';');
    return variableType as PatternFormatterDataType;
  }

  return null;
};
