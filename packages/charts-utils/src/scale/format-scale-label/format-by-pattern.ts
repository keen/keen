import numeral from 'numeral';

enum MathOperations {
  'add' = 'add',
  'subtract' = 'subtract',
  'multiply' = 'multiply',
  'divide' = 'divide',
}

export const formatByPattern = (
  pattern: string,
  value: string | number | Date
) => {
  const variableRegex = /\${(.*?)}+/;
  const variable = pattern.match(variableRegex);
  if (variable) {
    const [
      variableType,
      formatString,
      operationType,
      operationValue,
    ] = variable[1].split(';');
    const parsedOperationType =
      operationType &&
      (operationType.trim().toLocaleLowerCase() as MathOperations);
    let parsedValue = value;
    if (variableType === 'number' && !(value instanceof Date)) {
      const numberToFormat =
        typeof value === 'string' ? parseInt(value, 10) : value;
      parsedValue = formatNumber(
        numberToFormat,
        formatString,
        parsedOperationType,
        parseInt(operationValue, 10)
      );
    }
    return pattern.replace(variable[0], parsedValue.toString());
  }
  return value.toString();
};

const formatNumber = (
  value: number,
  formatString: string,
  operationType: MathOperations | null,
  operationValue: number
) => {
  const availableOperations = Object.values(MathOperations);
  let valueToFormat = value;
  if (
    operationType &&
    availableOperations.includes(operationType) &&
    !isNaN(operationValue)
  ) {
    valueToFormat = applyMathOperation(value, operationType, operationValue);
  }
  return numeral(valueToFormat).format(formatString);
};

const applyMathOperation = (
  value: number,
  operationType: MathOperations,
  operationFactor: number
) => {
  let output = value;
  switch (operationType) {
    case MathOperations.add:
      output += operationFactor;
      break;
    case MathOperations.subtract:
      output -= operationFactor;
      break;
    case MathOperations.divide:
      output /= operationFactor;
      break;
    case MathOperations.multiply:
      output *= operationFactor;
      break;
    default:
      break;
  }
  return output;
};
