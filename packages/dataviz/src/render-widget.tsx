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
  WidgetSettings,
} from '@keen.io/widgets';
import { ScaleSettings } from '@keen.io/charts';

import { ComponentSettings } from './types';

export type Widgets =
  | 'bar'
  | 'line'
  | 'area'
  | 'pie'
  | 'donut'
  | 'metric'
  | 'funnel'
  | 'heatmap';

type Options = {
  type: Widgets;
  keys: string[];
  data: any[];
  scaleSettings: Partial<ScaleSettings>;
  componentSettings?: ComponentSettings;
  widgetSettings?: WidgetSettings;
};

export const renderWidget = ({
  type,
  keys,
  data,
  scaleSettings,
  componentSettings,
  widgetSettings,
}: Options) => {
  const config = {
    keys,
    data,
    labelSelector: 'name',
    ...componentSettings,
    ...widgetSettings,
  };

  switch (type) {
    case 'funnel':
      const [key] = keys;
      return <FunnelChartWidget valueKey={key} {...config} />;
    case 'metric':
      return <MetricChartWidget {...config} />;
    case 'pie':
      return <PieChartWidget {...config} />;
    case 'donut':
      return <DonutChartWidget {...config} />;
    case 'bar':
      return (
        <BarChartWidget
          xScaleSettings={{ type: 'band', ...scaleSettings }}
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
          {...config}
        />
      );
    case 'line':
      return (
        <LineChartWidget
          xScaleSettings={{
            type: 'time',
            precision: 'month',
            ...scaleSettings,
          }}
          {...config}
        />
      );
    case 'area':
      return (
        <AreaChartWidget
          xScaleSettings={{
            type: 'time',
            precision: 'month',
            ...scaleSettings,
          }}
          {...config}
        />
      );
  }
};
