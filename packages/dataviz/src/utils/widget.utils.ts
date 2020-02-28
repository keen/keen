import deepMerge from 'deepmerge';
import {
  WidgetSettings,
  widgetSettings as defaultWidgetSettings,
  metricWidgetSettings as defaultMetricWidgetSettings,
} from '@keen.io/widgets';

import { Widgets } from '../render-widget';

import { VisualizerWidgetSettings } from '../types';

export const extendWidgetSettings = (
  customSettings: Partial<VisualizerWidgetSettings> = {},
  type: Widgets
): WidgetSettings => {
  switch (type) {
    case 'metric':
      return deepMerge(defaultMetricWidgetSettings, customSettings) as any;
    default:
      console.log(deepMerge(defaultWidgetSettings, customSettings), 'sa');
      return deepMerge(defaultWidgetSettings, customSettings) as any;
  }
};
