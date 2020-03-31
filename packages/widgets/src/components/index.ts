import ChartWidget from './chart-widget.component';

import BarChartWidget from './bar';
import LineChartWidget from './line';
import AreaChartWidget from './area';
import BubbleChartWidget from './bubble';
import PieChartWidget from './pie';
import DonutChartWidget from './donut';
import FunnelChartWidget from './funnel';
import ChoroplethChartWidget, { choroplethWidgetSettings } from './choropleth';
import MetricChartWidget, { metricWidgetSettings } from './metric';
import HeatmapChartWidget from './heatmap';

import { LegendSocket, ContentSocket } from './widget-sockets.component';

export {
  ChartWidget,
  LegendSocket,
  ContentSocket,
  ChoroplethChartWidget,
  PieChartWidget,
  DonutChartWidget,
  LineChartWidget,
  AreaChartWidget,
  BarChartWidget,
  FunnelChartWidget,
  MetricChartWidget,
  BubbleChartWidget,
  metricWidgetSettings,
  choroplethWidgetSettings,
  HeatmapChartWidget,
};
