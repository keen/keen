import { formatDate, formatNumber, MathOperations } from './helpers';

import { VARIABLE_REGEX } from './constants';

/**
 * Formats value based on provided pattern.
 *
 * @param pattern - format pattern
 * @param value - value to format
 * @return formatted value
 *
 */
const formatByPattern = (pattern: string, value: string | number | Date) => {
  const variable = pattern.match(VARIABLE_REGEX);
  if (value === null) return null;
  if (variable) {
    const [variableType, ...additionalParameters] = variable[1].split(';');
    let parsedValue = value;
    if (variableType === 'number' && !(value instanceof Date)) {
      const [
        formatString,
        operationType,
        operationValue,
      ] = additionalParameters;
      const parsedOperationType =
        operationType &&
        (operationType.trim().toLocaleLowerCase() as MathOperations);
      const numberToFormat =
        typeof value === 'string' ? parseInt(value, 10) : value;
      parsedValue = formatNumber(
        numberToFormat,
        formatString,
        parsedOperationType,
        parseInt(operationValue, 10)
      );
    }
    if (variableType === 'datetime') {
      const [dateFormatter, timeFormatter] = additionalParameters;
      parsedValue = formatDate(value, dateFormatter, timeFormatter);
    }
    return pattern.replace(variable[0], parsedValue.toString());
  }
  return value.toString();
};

export default formatByPattern;
