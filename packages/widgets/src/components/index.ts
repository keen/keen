import ChartWidget from './chart-widget.component';

import BarChartWidget from './bar';
import LineChartWidget from './line';
import AreaChartWidget from './area';
import BubbleChartWidget, { bubbleWidgetSettings } from './bubble';
import PieChartWidget from './pie';
import DonutChartWidget from './donut';
import FunnelChartWidget from './funnel';
import ChoroplethChartWidget, { choroplethWidgetSettings } from './choropleth';
import MetricChartWidget, { metricWidgetSettings } from './metric';
import HeatmapChartWidget from './heatmap';
import GaugeChartWidget from './gauge';
import TableChartWidget from './table';
import ErrorWidget from './error';

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
  GaugeChartWidget,
  FunnelChartWidget,
  MetricChartWidget,
  BubbleChartWidget,
  bubbleWidgetSettings,
  metricWidgetSettings,
  choroplethWidgetSettings,
  HeatmapChartWidget,
  TableChartWidget,
  ErrorWidget,
};
