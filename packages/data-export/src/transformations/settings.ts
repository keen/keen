import {
  PieChartSettings,
  LineChartSettings,
  FunnelChartSettings,
  TableChartSettings,
  HeatmapChartSettings,
  ChoroplethChartSettings,
  MetricChartSettings,
  BarChartSettings,
} from '@keen.io/charts';

import { VisualizationExport, TransformationInput } from '../types';

import { transform as transformLineChart } from './line';
import { transform as transformTableChart } from './table';
import { transform as transformCircularChart } from './circular';
import { transform as transformHeatmapChart } from './heatmap';
import { transform as transformBarChart } from './bar';
import { transform as transformFunnelChart } from './funnel';
import { transform as transformMetricChart } from './metric';
import { transform as transformChoroplethChart } from './choropleth';

export const transformData = ({
  widgetType,
  chartSettings,
  query,
}: VisualizationExport) => {
  switch (widgetType) {
    case 'choropleth':
      return transformChoroplethChart({
        chartSettings,
        query,
      } as TransformationInput<ChoroplethChartSettings>);
    case 'metric':
      return transformMetricChart({
        chartSettings,
        query,
      } as TransformationInput<MetricChartSettings>);
    case 'funnel':
      return transformFunnelChart({
        chartSettings,
        query,
      } as TransformationInput<FunnelChartSettings>);
    case 'bar':
      return transformBarChart({
        chartSettings,
        query,
      } as TransformationInput<BarChartSettings>);
    case 'heatmap':
      return transformHeatmapChart({
        chartSettings,
        query,
      } as TransformationInput<HeatmapChartSettings>);
    case 'pie':
    case 'donut':
      return transformCircularChart({
        chartSettings,
        query,
      } as TransformationInput<PieChartSettings>);
    case 'line':
    case 'area':
      return transformLineChart({
        chartSettings,
        query,
      } as TransformationInput<LineChartSettings>);
    case 'table':
      return transformTableChart({
        chartSettings,
        query,
      } as TransformationInput<TableChartSettings>);
    default:
      return [];
  }
};
