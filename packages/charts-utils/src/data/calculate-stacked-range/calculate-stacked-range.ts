/**
 * Calculates stacked range based on sum for positive and
 * negative values across provided data series.
 *
 * @param data - data series
 * @param minValue - predefined minimum value
 * @param maxValue - predefined maximum value
 * @param keys - keys from data used in calculation
 * @return range values
 *
 */
const calculateStackedRange = (
  data: Record<string, any>[],
  minValue: number | 'auto',
  maxValue: number | 'auto',
  keys: string[]
) => {
  let minimumRange = 0;
  let maximumRange = 0;

  data.forEach((item: Record<string, number>) => {
    const itemRange = keys.reduce(
      (acc, keyName: string) => {
        const value = item[keyName];
        if (value >= 0) acc.maximum += value;
        if (value < 0) acc.minimum += value;
        return acc;
      },
      { minimum: 0, maximum: 0 }
    );

    if (itemRange.minimum < minimumRange) minimumRange = itemRange.minimum;
    if (itemRange.maximum > maximumRange) maximumRange = itemRange.maximum;
  });

  const minimum = minValue === 'auto' ? minimumRange : minValue;
  const maximum = maxValue === 'auto' ? maximumRange : maxValue;

  return {
    minimum,
    maximum,
  };
};

export default calculateStackedRange;
