import { formatByPattern } from '../../format';

import { ScaleSettings } from '../../types';

/**
 * Adjusts axis tick label based on scale settings
 *
 * @param value - scale tick value
 * @param scaleSettings - scale settings
 * @return formatted value
 *
 */
const formatScaleLabel = (
  value: number | string | Date,
  scaleSettings?: ScaleSettings
): string | number => {
  if (scaleSettings?.formatLabel) {
    if (typeof scaleSettings.formatLabel === 'string')
      return formatByPattern(scaleSettings.formatLabel, value);
    if (typeof scaleSettings.formatLabel === 'function')
      return scaleSettings.formatLabel(value);
  }
  if (value instanceof Date) return value.toString();
  return value;
};

export default formatScaleLabel;
