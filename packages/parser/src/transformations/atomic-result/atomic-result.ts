import { AtomicResult } from '../../types';

/**
 * Transforms atomic results and merges properties
 *
 * @param input - Keen API atomic result
 * @param mergePropertiesOrder - Order used during merge of properties
 * @return transformed atomic result
 *
 */
export const transformAtomicResult = (
  input: AtomicResult,
  mergePropertiesOrder?: string[]
) => {
  const { result, ...properties } = input;
  const hasGroupedProperties = Object.keys(properties).length > 1;

  if (hasGroupedProperties) {
    const propertiesToGroup = mergePropertiesOrder
      ? mergePropertiesOrder
      : Object.keys(properties);

    const groupedProperties = propertiesToGroup.reduce(
      ([currentKey, currentValue], key) => {
        const value = properties[key];
        const mergedValue = currentValue ? `${currentValue} ${value}` : value;
        const mergedKey = currentKey ? `${currentKey}-${key}` : key;

        return [mergedKey, mergedValue];
      },
      []
    );

    const [name, value] = groupedProperties;
    return {
      result,
      [name]: value,
    };
  }

  return {
    result,
    ...properties,
  };
};
