import { GroupByResult } from '../../types';

/**
 * Merge properties from gruop based on provided order
 *
 * @param propertiesGroup - Object with grouped properties
 * @param mergeOrder - Order used during merge of properties
 * @return merged properties
 *
 */
export const mergePropertiesGroup = (
  propertiesGroup: GroupByResult,
  mergeOrder?: string[]
) => {
  const { result, ...properties } = propertiesGroup;
  const hasGroupedProperties = Object.keys(properties).length > 1;

  if (hasGroupedProperties) {
    const propertiesToGroup = mergeOrder ? mergeOrder : Object.keys(properties);

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
