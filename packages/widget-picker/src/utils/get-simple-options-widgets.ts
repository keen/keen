import { PickerWidgets } from '../types';

/**
 * Get widgets that should have disabled advanced settings.
 *
 * @param query - query settings
 * @return collection of widgets with disabled advanced settings
 *
 */
export const getSimpleOptionsWidgets = (
  query: Record<string, any>
): PickerWidgets[] => {
  if (!query.interval) return ['metric'];
  return [];
};
