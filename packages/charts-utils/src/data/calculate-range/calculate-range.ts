import { max, min } from 'd3-array';

import getValues from '../get-values';

/**
 * Calculates values range based on provided data series.
 *
 * @param data - data series
 * @param minValue - predefined minimum value
 * @param maxValue - predefined maximum value
 * @param keys - keys from data used in calculation
 * @return range values
 *
 */
const calculateRange = (
  data: Record<string, any>[],
  minValue: number | 'auto',
  maxValue: number | 'auto',
  keys: string[]
): { minimum: number; maximum: number } => {
  const values = getValues(data, keys);

  let minimum = minValue === 'auto' ? min<number>(values) : minValue;
  if (minimum > 0 && minValue === 'auto') {
    minimum = 0;
  }

  let maximum = maxValue === 'auto' ? max<number>(values) : maxValue;
  const isNegativeSeries = minimum < 0 && maximum <= 0 && maxValue === 'auto';
  if (isNegativeSeries) {
    maximum = 0;
  }

  return {
    minimum,
    maximum,
  };
};

export default calculateRange;
