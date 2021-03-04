/**
 * Calculates stacked range based on sum values across provided data series.
 *
 * @param data - data series
 * @param minValue - predefined minimum value
 * @param maxValue - predefined maximum value
 * @param keys - keys from data used in calculation
 * @return range values
 *
 */
const calculateLineStackedRange = (
  data: Record<string, any>[],
  minValue: number | 'auto',
  maxValue: number | 'auto',
  keys: string[]
) => {
  let minimumRange = 0;
  let maximumRange = 0;

  data.forEach((item: Record<string, number>) => {
    keys.reduce((acc, keyName: string) => {
      const value = item[keyName];
      acc += value;

      if (acc < minimumRange) minimumRange = acc;
      if (acc > maximumRange) maximumRange = acc;
      return acc;
    }, 0);
  });

  const minimum = minValue === 'auto' ? minimumRange : minValue;
  const maximum = maxValue === 'auto' ? maximumRange : maxValue;

  return {
    minimum,
    maximum,
  };
};

export default calculateLineStackedRange;
