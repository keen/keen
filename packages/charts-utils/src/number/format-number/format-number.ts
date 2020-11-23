import { format } from 'd3-format';

/**
 * Format numbers to human-redable form
 *
 * @param value - value to be formatted
 * @param precision - number precision
 * @return formatted value
 *
 * formatNumber(1200) => 1.2k
 *
 */
const formatNumber = (value: number, precision = 2) => {
  const formatter = format(`.${precision}s`);
  return value === 0 ? value.toString() : formatter(value);
};

export default formatNumber;
