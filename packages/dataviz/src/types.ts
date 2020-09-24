import {
  BarChartSettings,
  LineChartSettings,
  PieChartSettings,
  DonutChartSettings,
  MetricChartSettings,
  FunnelChartSettings,
  HeatmapChartSettings,
  ChoroplethChartSettings,
  BubbleChartSettings,
  GaugeChartSettings,
} from '@keen.io/charts';
import { Query, Step, AnalysisResult } from '@keen.io/parser';
import { CardSettings } from '@keen.io/ui-core';
import { TextSettings, LegendSettings } from '@keen.io/widgets';

import { Widgets } from './render-widget';

export type VisualizationInput = Partial<{
  query: Query;
  steps: Step[];
  result: AnalysisResult;
}>;

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
  | GaugeChartSettings
  | PieChartSettings
  | DonutChartSettings
  | MetricChartSettings
  | FunnelChartSettings
  | HeatmapChartSettings
  | ChoroplethChartSettings
  | BubbleChartSettings
  | {};

export type Options = {
  container: HTMLElement | string;
  type: Widgets;
  mappings?: Record<string, string>;
  widget?: Partial<VisualizerWidgetSettings>;
  settings?: ComponentSettings;
};
