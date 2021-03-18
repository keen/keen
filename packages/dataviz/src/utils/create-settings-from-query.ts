import { Widgets } from '@keen.io/widgets';
import { Query } from '@keen.io/query';

import {
  setBarChartSettings,
  setHeatmapChartSettings,
  setTableChartSettings,
  setBubbleChartSettings,
  setLineChartSettings,
  setGaugeChartSettings,
  setFunnelChartSettings,
  setChoroplethChartSettings,
  setMetricChartSettings,
} from './chart-settings';
import { ComponentSettings } from '../types';

type Options = {
  query: Partial<Query>;
  widgetType: Widgets;
  keys: string[];
  componentSettings: ComponentSettings;
};

/**
 * Determines visualization settings based on query
 * definition and parser results.
 *
 * @param query - Query settings
 * @param widgetType - type of widget
 * @return chart settings
 *
 */
export const createChartSettings = ({
  query,
  widgetType,
  keys,
  componentSettings,
}: Options) => {
  const input = { query, keys, componentSettings };

  switch (widgetType) {
    case 'funnel':
      return setFunnelChartSettings(input);
    case 'gauge':
      return setGaugeChartSettings(input);
    case 'choropleth':
      return setChoroplethChartSettings(input);
    case 'bubble':
      return setBubbleChartSettings(input);
    case 'line':
    case 'area':
      return setLineChartSettings(input);
    case 'heatmap':
      return setHeatmapChartSettings(input);
    case 'bar':
      return setBarChartSettings(input);
    case 'table':
      return setTableChartSettings(input);
    case 'metric':
      return setMetricChartSettings(input);
    default:
      return {};
  }
};
