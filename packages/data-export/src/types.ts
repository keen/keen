import { Widgets } from '@keen.io/widgets';
import { Query } from '@keen.io/query';

import {
  PieChartSettings,
  DonutChartSettings,
  BarChartSettings,
  LineChartSettings,
  FunnelChartSettings,
  TableChartSettings,
  MetricChartSettings,
  ChoroplethChartSettings,
  HeatmapChartSettings,
} from '@keen.io/charts';

export type ChartSettings =
  | PieChartSettings
  | DonutChartSettings
  | BarChartSettings
  | LineChartSettings
  | FunnelChartSettings
  | MetricChartSettings
  | ChoroplethChartSettings
  | TableChartSettings
  | HeatmapChartSettings;

export type TransformationInput<S> = {
  query: Query;
  chartSettings: S;
};

export type VisualizationExport = {
  query: Query;
  chartSettings: ChartSettings;
  widgetType: Widgets;
};
