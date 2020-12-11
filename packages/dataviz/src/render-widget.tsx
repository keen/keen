import React from 'react';
import {
  BarChartWidget,
  LineChartWidget,
  AreaChartWidget,
  PieChartWidget,
  DonutChartWidget,
  MetricChartWidget,
  FunnelChartWidget,
  HeatmapChartWidget,
  ChoroplethChartWidget,
  BubbleChartWidget,
  GaugeChartWidget,
  WidgetSettings,
  TableChartWidget,
  LegendSettings,
  BubbleWidgetLegendSettings,
  Widgets,
} from '@keen.io/widgets';

import {
  FunnelChartSettings,
  GaugeChartSettings,
  ChoroplethChartSettings,
  BubbleChartSettings,
  MetricChartSettings,
  PieChartSettings,
  DonutChartSettings,
  TableChartSettings,
  BarChartSettings,
  LineChartSettings,
  AreaChartSettings,
  HeatmapChartSettings,
} from '@keen.io/charts';

import { KEEN_KEY } from '@keen.io/parser';

type Options = {
  type: Widgets;
  keys: string[];
  data: Record<string, any>[];
  componentSettings?: Record<string, any>;
  widgetSettings?: WidgetSettings;
  legend?: LegendSettings | BubbleWidgetLegendSettings;
};

export const renderWidget = ({
  type,
  keys,
  data,
  componentSettings,
  widgetSettings,
  legend,
}: Options) => {
  const chartSettings: unknown = {
    keys,
    data,
    labelSelector: KEEN_KEY,
    ...componentSettings,
  };

  switch (type) {
    case 'bubble':
      return (
        <BubbleChartWidget
          legend={legend as BubbleWidgetLegendSettings}
          {...(chartSettings as BubbleChartSettings)}
          {...widgetSettings}
        />
      );
    case 'choropleth':
      return (
        <ChoroplethChartWidget
          legend={legend as LegendSettings}
          {...(chartSettings as ChoroplethChartSettings)}
          {...widgetSettings}
        />
      );
    case 'gauge':
      return (
        <GaugeChartWidget
          legend={legend as LegendSettings}
          {...(chartSettings as GaugeChartSettings)}
          {...widgetSettings}
        />
      );
    case 'funnel':
      return (
        <FunnelChartWidget
          legend={legend as LegendSettings}
          {...(chartSettings as FunnelChartSettings)}
          {...widgetSettings}
        />
      );
    case 'metric':
      return (
        <MetricChartWidget
          {...(chartSettings as MetricChartSettings)}
          {...widgetSettings}
        />
      );
    case 'pie':
      return (
        <PieChartWidget
          legend={legend as LegendSettings}
          {...(chartSettings as PieChartSettings)}
          {...widgetSettings}
        />
      );
    case 'donut':
      return (
        <DonutChartWidget
          legend={legend as LegendSettings}
          {...(chartSettings as DonutChartSettings)}
          {...widgetSettings}
        />
      );
    case 'table':
      return (
        <TableChartWidget
          {...(chartSettings as TableChartSettings)}
          {...widgetSettings}
        />
      );
    case 'bar':
      return (
        <BarChartWidget
          legend={legend as LegendSettings}
          {...(chartSettings as BarChartSettings)}
          {...widgetSettings}
        />
      );
    case 'heatmap':
      return (
        <HeatmapChartWidget
          legend={legend as LegendSettings}
          {...(chartSettings as HeatmapChartSettings)}
          {...widgetSettings}
        />
      );
    case 'line':
      return (
        <LineChartWidget
          legend={legend as LegendSettings}
          {...(chartSettings as LineChartSettings)}
          {...widgetSettings}
        />
      );
    case 'area':
      return (
        <AreaChartWidget
          legend={legend as LegendSettings}
          {...(chartSettings as AreaChartSettings)}
          {...widgetSettings}
        />
      );
  }
};
