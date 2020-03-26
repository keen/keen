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
  WidgetSettings,
} from '@keen.io/widgets';
import { ScaleSettings } from '@keen.io/charts';

import { KEEN_KEY } from '@keen.io/parser';

import { DEFAULT_TIME_PRECISION } from './constants';

import { ComponentSettings } from './types';

export type Widgets =
  | 'bar'
  | 'line'
  | 'area'
  | 'pie'
  | 'donut'
  | 'metric'
  | 'funnel'
  | 'choropleth'
  | 'bubble'
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
          {...config}
        />
      );
    case 'choropleth':
      return (
        <ChoroplethChartWidget
          geoKey={config.labelSelector}
          valueKey={valueKey}
          {...config}
        />
      );
    case 'funnel':
      return <FunnelChartWidget valueKey={valueKey} {...config} />;
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
            precision: DEFAULT_TIME_PRECISION,
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
            precision: DEFAULT_TIME_PRECISION,
            ...scaleSettings,
          }}
          {...config}
        />
      );
  }
};
