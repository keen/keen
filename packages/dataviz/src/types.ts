import {
  BarChartSettings,
  LineChartSettings,
  PieChartSettings,
} from '@keen.io/charts';

import { Widgets } from './render-widget';

export type ComponentSettings =
  | BarChartSettings
  | LineChartSettings
  | PieChartSettings
  | {};

export type WidgetSettings = {
  title?: string;
  subtitle?: string;
};

export type Options = {
  container: HTMLElement | string;
  type: Widgets;
  widget?: WidgetSettings;
  settings?: ComponentSettings;
};
