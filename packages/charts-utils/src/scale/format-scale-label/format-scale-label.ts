import { formatByPattern } from '../../format';
import { createDateFormatter } from '../../time';

import { ScaleSettings, TimePrecision } from '../../types';

/**
 * Format axis tick label based on scale settings
 *
 * @param value - scale tick value
 * @param scaleSettings - scale settings
 * @param ticksPrecision - ticks precision for time scales
 * @return formatted value
 *
 */
const formatScaleLabel = (
  value: number | string | Date,
  scaleSettings?: ScaleSettings,
  ticksPrecision?: TimePrecision
): string | number => {
  if (scaleSettings?.formatLabel) {
    if (typeof scaleSettings.formatLabel === 'string')
      return formatByPattern(scaleSettings.formatLabel, value);
    if (typeof scaleSettings.formatLabel === 'function')
      return scaleSettings.formatLabel(value);
  } else {
    if (scaleSettings?.type === 'time' && ticksPrecision) {
      return createDateFormatter(ticksPrecision)(value);
    }
  }

  if (value instanceof Date) return value.toString();
  return value;
};

export default formatScaleLabel;
