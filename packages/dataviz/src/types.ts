import {
  BarChartSettings,
  LineChartSettings,
  PieChartSettings,
  DonutChartSettings,
  MetricChartSettings,
  FunnelChartSettings,
  HeatmapChartSettings,
  ChoroplethChartSettings,
} from '@keen.io/charts';
import { CardSettings } from '@keen.io/ui-core';
import { TextSettings, LegendSettings } from '@keen.io/widgets';

import { Widgets } from './render-widget';

export type VisualizerWidgetSettings = {
  title?: Partial<TextSettings>;
  subtitle?: Partial<TextSettings>;
  legend?: Partial<LegendSettings>;
  card?: Partial<CardSettings>;
  geographicArea?: string;
};

export type ComponentSettings =
  | BarChartSettings
  | LineChartSettings
  | PieChartSettings
  | DonutChartSettings
  | MetricChartSettings
  | FunnelChartSettings
  | HeatmapChartSettings
  | ChoroplethChartSettings
  | {};

export type Options = {
  container: HTMLElement | string;
  type: Widgets;
  widget?: Partial<VisualizerWidgetSettings>;
  settings?: ComponentSettings;
};
