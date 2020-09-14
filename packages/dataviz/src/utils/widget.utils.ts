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

export const extendWidgetSettings = (
  customSettings: Partial<VisualizerWidgetSettings> = {},
  type?: Widgets
): WidgetSettings => {
  switch (type) {
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
