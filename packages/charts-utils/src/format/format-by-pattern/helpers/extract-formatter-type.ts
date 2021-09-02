import { VARIABLE_REGEX } from '../constants';

/**
 * Get data type from string format pattern.
 *
 * @param pattern - format pattern
 * @return formatter data type
 *
 */
export const extractFormatterType = (pattern: string) => {
  const variable = pattern.match(VARIABLE_REGEX);
  if (variable) {
    const [variableType] = variable[1].split(';');
    return variableType;
  }

  return null;
};
