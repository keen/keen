import {
  BarChartSettings,
  LineChartSettings,
  PieChartSettings,
} from '@keen.io/charts';
import { WidgetSettings } from '@keen.io/widgets';

import { Widgets } from './render-widget';

export type ComponentSettings =
  | BarChartSettings
  | LineChartSettings
  | PieChartSettings
  | {};

export type Options = {
  container: HTMLElement | string;
  type: Widgets;
  widget?: WidgetSettings;
  settings?: ComponentSettings;
};
