/**
 * Calculates total value for provided data series.
 * Used by circular chart generate function.
 *
 * @param data - data series
 * @param labelSelector - key used as label selector
 * @param keys - data series keys
 * @return total value
 *
 */
export const calculateTotalValue = (
  data: Record<string, any>[],
  labelSelector: string,
  keys: string[]
): number => {
  let total = 0;
  data.map((item) => {
    const label = item[labelSelector];
    const result = keys.reduce((acc, currentKey) => {
      if (currentKey !== label) return acc + item[currentKey];
      return acc;
    }, 0) as number;
    total += result;
  });
  return total;
};

export default calculateTotalValue;
