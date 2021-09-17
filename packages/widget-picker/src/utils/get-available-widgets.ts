import { PickerWidgets } from '../types';

export const getAvailableWidgets = (
  query: Record<string, any>
): PickerWidgets[] => {
  if (query.analysis_type === 'extraction') {
    return ['table', 'json'];
  }

  if (query.analysis_type === 'select_unique') {
    return ['table', 'json'];
  }

  if (query.analysis_type === 'funnel') {
    return ['funnel', 'table', 'json', 'bar'];
  }

  if (query.analysis_type === 'multi_analysis') {
    return ['json'];
  }

  if (query.group_by && !query.interval) {
    return ['bar', 'table', 'json', 'pie', 'donut', 'heatmap', 'choropleth'];
  }

  if (query.interval && !query.group_by) {
    return ['line', 'table', 'json', 'metric', 'bar', 'area', 'heatmap'];
  }

  if (query.interval) {
    return ['line', 'table', 'json', 'bar', 'area', 'heatmap'];
  }

  return ['metric', 'table', 'json'];
};
