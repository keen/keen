import deepMerge from 'deepmerge';
import {
  WidgetSettings,
  Widgets,
  widgetSettings as defaultWidgetSettings,
  metricWidgetSettings as defaultMetricWidgetSettings,
  choroplethWidgetSettings as defaultChoroplethWidgetSettings,
  bubbleWidgetSettings as defaultBubbleWidgetSettings,
} from '@keen.io/widgets';

import { VisualizerWidgetSettings } from '../types';

/**
 * Extends widget settings with custom configuration
 * dedicated for specific visualization.
 *
 * @param customSettings - Query settings
 * @param widgetType - type of widget
 * @return widget settings
 *
 */
export const extendWidgetSettings = (
  customSettings: Partial<VisualizerWidgetSettings> = {},
  widgetType: Widgets
): WidgetSettings => {
  switch (widgetType) {
    case 'choropleth':
      return deepMerge(
        defaultChoroplethWidgetSettings,
        customSettings
      ) as WidgetSettings;
    case 'metric':
      return deepMerge(
        defaultMetricWidgetSettings,
        customSettings
      ) as WidgetSettings;
    case 'bubble':
      return deepMerge(
        defaultBubbleWidgetSettings,
        customSettings
      ) as WidgetSettings;
    default:
      return deepMerge(defaultWidgetSettings, customSettings) as WidgetSettings;
  }
};
