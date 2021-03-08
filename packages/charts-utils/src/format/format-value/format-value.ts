import formatByPattern from '../format-by-pattern';

import { TooltipFormatter } from '../../types';

const formatValue = (
  value: string | number | Date,
  formatter?: TooltipFormatter
) => {
  if (typeof formatter === 'string') return formatByPattern(formatter, value);
  if (typeof formatter === 'function') return formatter(value);
  return value;
};

export default formatValue;
