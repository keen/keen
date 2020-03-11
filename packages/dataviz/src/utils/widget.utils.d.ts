import { WidgetSettings } from '@keen.io/widgets';
import { Widgets } from '../render-widget';
import { VisualizerWidgetSettings } from '../types';
export declare const extendWidgetSettings: (
  customSettings: Partial<VisualizerWidgetSettings>,
  type: Widgets
) => WidgetSettings;
