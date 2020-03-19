import ChartWidget from './chart-widget.component';

import BarChartWidget from './bar';
import LineChartWidget from './line';
import PieChartWidget from './pie';
import DonutChartWidget from './donut';
import FunnelChartWidget from './funnel';
import MetricChartWidget, { metricWidgetSettings } from './metric';
import HeatmapChartWidget from './heatmap';

import { LegendSocket, ContentSocket } from './widget-sockets.component';

export {
  ChartWidget,
  LegendSocket,
  ContentSocket,
  PieChartWidget,
  DonutChartWidget,
  LineChartWidget,
  BarChartWidget,
  FunnelChartWidget,
  MetricChartWidget,
  metricWidgetSettings,
  HeatmapChartWidget,
};
