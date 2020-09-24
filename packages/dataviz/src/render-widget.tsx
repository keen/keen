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
} from '@keen.io/widgets';
import { ScaleSettings } from '@keen.io/charts-utils';
import { colors } from '@keen.io/colors';

import { KEEN_KEY } from '@keen.io/parser';

import { DEFAULT_TIME_PRECISION } from './constants';

import { ComponentSettings } from './types';

export type Widgets =
  | 'bar'
  | 'line'
  | 'area'
  | 'pie'
  | 'donut'
  | 'gauge'
  | 'metric'
  | 'funnel'
  | 'choropleth'
  | 'bubble'
  | 'heatmap'
  | 'table';

type Options = {
  type: Widgets;
  keys: string[];
  data: any[];
  scaleSettings: Partial<ScaleSettings>;
  componentSettings?: ComponentSettings;
  widgetSettings?: WidgetSettings;
  legend?: LegendSettings | BubbleWidgetLegendSettings;
};

export const renderWidget = ({
  type,
  keys,
  data,
  scaleSettings,
  componentSettings,
  widgetSettings,
  legend,
}: Options) => {
  const config = {
    keys,
    data,
    labelSelector: KEEN_KEY,
    ...componentSettings,
    ...widgetSettings,
  };

  const [valueKey] = keys;

  switch (type) {
    case 'bubble':
      const [xDomainKey, yDomainKey, bubbleValueKey] = keys;
      return (
        <BubbleChartWidget
          xDomainKey={xDomainKey}
          yDomainKey={yDomainKey}
          valueKey={bubbleValueKey}
          legend={legend as BubbleWidgetLegendSettings}
          {...config}
        />
      );
    case 'choropleth':
      return (
        <ChoroplethChartWidget
          geoKey={config.labelSelector}
          valueKey={valueKey}
          legend={legend as LegendSettings}
          {...config}
        />
      );
    case 'gauge':
      return (
        <GaugeChartWidget
          valueKey={valueKey}
          legend={legend as LegendSettings}
          {...config}
        />
      );
    case 'funnel':
      return (
        <FunnelChartWidget
          valueKey={valueKey}
          legend={legend as LegendSettings}
          {...config}
        />
      );
    case 'metric':
      return <MetricChartWidget {...config} />;
    case 'pie':
      return <PieChartWidget legend={legend as LegendSettings} {...config} />;
    case 'donut':
      return <DonutChartWidget legend={legend as LegendSettings} {...config} />;
    case 'table':
      return <TableChartWidget color={colors.blue[500]} {...config} />;
    case 'bar':
      return (
        <BarChartWidget
          xScaleSettings={{ type: 'band', ...scaleSettings }}
          legend={legend as LegendSettings}
          {...config}
        />
      );
    case 'heatmap':
      return (
        <HeatmapChartWidget
          yScaleSettings={{
            type: 'band',
            ...scaleSettings,
          }}
          legend={legend as LegendSettings}
          {...config}
        />
      );
    case 'line':
      return (
        <LineChartWidget
          xScaleSettings={{
            type: 'time',
            precision: DEFAULT_TIME_PRECISION,
            ...scaleSettings,
          }}
          legend={legend as LegendSettings}
          {...config}
        />
      );
    case 'area':
      return (
        <AreaChartWidget
          xScaleSettings={{
            type: 'time',
            precision: DEFAULT_TIME_PRECISION,
            ...scaleSettings,
          }}
          legend={legend as LegendSettings}
          {...config}
        />
      );
  }
};
