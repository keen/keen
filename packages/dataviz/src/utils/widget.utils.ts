import deepMerge from 'deepmerge';
import {
  WidgetSettings,
  widgetSettings as defaultWidgetSettings,
  metricWidgetSettings as defaultMetricWidgetSettings,
  choroplethWidgetSettings as defaultChoroplethWidgetSettings,
} from '@keen.io/widgets';

import { Widgets } from '../render-widget';

import { VisualizerWidgetSettings } from '../types';

export const extendWidgetSettings = (
  customSettings: Partial<VisualizerWidgetSettings> = {},
  type: Widgets
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
    default:
      return deepMerge(defaultWidgetSettings, customSettings) as WidgetSettings;
  }
};
