import numeral from 'numeral';

export enum MathOperations {
  'add' = 'add',
  'subtract' = 'subtract',
  'multiply' = 'multiply',
  'divide' = 'divide',
}

export const formatNumber = (
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
