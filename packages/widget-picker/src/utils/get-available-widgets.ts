import { PickerWidgets } from '../types';

export const getAvailableWidgets = (
  query: Record<string, any>
): PickerWidgets[] => {
  if (query.analysis_type === 'extraction') {
    return ['table', 'json'];
  }

  if (query.analysis_type === 'select_unique') {
    return ['table', 'json', 'table'];
  }

  if (query.analysis_type === 'funnel') {
    return ['table', 'json', 'bar', 'area', 'line', 'funnel', 'table'];
  }

  if (query.group_by && !query.interval) {
    return ['table', 'json', 'bar', 'pie', 'donut', 'heatmap', 'choropleth'];
  }

  if (query.interval) {
    return ['table', 'json', 'bar', 'area', 'line', 'heatmap'];
  }

  return ['table', 'json'];
};
