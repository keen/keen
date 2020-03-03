import ChartWidget from './chart-widget.component';

import BarChartWidget from './bar-chart.widget';
import LineChartWidget from './line-chart.widget';

import PieChartWidget from './pie';
import MetricChartWidget, { metricWidgetSettings } from './metric';

import { LegendSocket, ContentSocket } from './widget-sockets.component';

export {
  ChartWidget,
  LegendSocket,
  ContentSocket,
  PieChartWidget,
  LineChartWidget,
  BarChartWidget,
  MetricChartWidget,
  metricWidgetSettings,
};
