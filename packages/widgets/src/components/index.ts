import ChartWidget from './chart-widget.component';

import BarChartWidget from './bar-chart.widget';
import LineChartWidget from './line-chart.widget';
import AreaChartWidget from './area.widget';

import PieChartWidget from './pie';
import DonutChartWidget from './donut';
import FunnelChartWidget from './funnel';
import MetricChartWidget, { metricWidgetSettings } from './metric';

import HeatmapChartWidget from './heatmap-chart.widget';

import { LegendSocket, ContentSocket } from './widget-sockets.component';

export {
  ChartWidget,
  LegendSocket,
  ContentSocket,
  PieChartWidget,
  DonutChartWidget,
  LineChartWidget,
  AreaChartWidget,
  BarChartWidget,
  FunnelChartWidget,
  MetricChartWidget,
  metricWidgetSettings,
  HeatmapChartWidget,
};
