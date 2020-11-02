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
  TableChartSettings,
} from '@keen.io/charts';
import { Query, Step, AnalysisResult } from '@keen.io/parser';
import { CardSettings } from '@keen.io/ui-core';
import { TextSettings, LegendSettings, Widgets } from '@keen.io/widgets';

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
  | BubbleChartSettings
  | BarChartSettings
  | LineChartSettings
  | GaugeChartSettings
  | PieChartSettings
  | DonutChartSettings
  | MetricChartSettings
  | FunnelChartSettings
  | HeatmapChartSettings
  | TableChartSettings
  | ChoroplethChartSettings;

export type Options = {
  container: HTMLElement | string;
  type: Widgets;
  mappings?: Record<string, string>;
  widget?: Partial<VisualizerWidgetSettings>;
  settings?: ComponentSettings;
};
