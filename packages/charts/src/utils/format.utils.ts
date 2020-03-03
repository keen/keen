import { format } from 'd3-format';

import { ScaleSettings } from '../types';

export const formatNumber = (value: number, precision = 2) => {
  const formatter = format(`.${precision}s`);
  return formatter(value);
};

export const formatText = (
  value: number | string | Date,
  scaleSettings?: ScaleSettings
): string | number => {
  if (scaleSettings?.formatLabel) return scaleSettings.formatLabel(value);
  if (value instanceof Date) return value.toString();
  return value;
};
