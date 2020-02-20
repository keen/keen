import deepMerge from 'deepmerge';
import {
  WidgetSettings,
  widgetSettings as defaultWidgetSettings,
} from '@keen.io/widgets';

export const extendWidgetSettings = (
  customSettings: Partial<WidgetSettings> = {}
) => deepMerge(defaultWidgetSettings, customSettings);
