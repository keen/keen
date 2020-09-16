import { Widget, ChartOptions } from './types';

export const MODE_OPTIONS: ChartOptions = {
  label: 'Mode',
  id: 'mode',
  settings: [
    {
      label: 'Grouped',
      isActive: ({ groupMode }) => groupMode === 'grouped',
      defaultChartSettings: {
        groupMode: 'grouped',
        stackMode: undefined,
      },
    },
    {
      label: 'Stacked Normal',
      isActive: ({ groupMode, stackMode }) =>
        groupMode === 'stacked' && stackMode === 'normal',
      defaultChartSettings: {
        groupMode: 'stacked',
        stackMode: 'normal',
      },
    },
    {
      label: 'Stacked %',
      isActive: ({ groupMode, stackMode }) =>
        groupMode === 'stacked' && stackMode === 'percent',
      defaultChartSettings: {
        groupMode: 'stacked',
        stackMode: 'percent',
      },
    },
  ],
};

export const LINE_CURVE_OPTIONS: ChartOptions = {
  label: 'Shape',
  id: 'line-shape',
  settings: [
    {
      label: 'Line',
      isActive: ({ curve }) => curve === 'linear',
      defaultChartSettings: {
        curve: 'linear',
      },
    },
    {
      label: 'Spline',
      isActive: ({ curve }) => curve === 'spline',
      defaultChartSettings: {
        curve: 'spline',
      },
    },
    {
      label: 'Steps',
      isActive: ({ curve }) => curve === 'step',
      defaultChartSettings: {
        curve: 'step',
      },
    },
  ],
};

export const WIDGETS: Widget[] = [
  {
    id: 'table',
    icon: 'table-widget',
    widget: 'table',
    isActive: widget => widget === 'table',
    defaultChartSettings: {},
    defaultWidgetSettings: {},
  },
  {
    id: 'json',
    icon: 'json',
    widget: 'json',
    isActive: widget => widget === 'json',
    defaultChartSettings: {},
    defaultWidgetSettings: {},
  },
  {
    id: 'metric',
    icon: 'metric-widget',
    widget: 'metric',
    isActive: widget => widget === 'metric',
    defaultChartSettings: {},
    defaultWidgetSettings: {},
  },
  {
    id: 'bar-vertical',
    icon: 'bar-widget-vertical',
    widget: 'bar',
    chartOptions: [MODE_OPTIONS],
    isActive: (widget, { layout }) => widget === 'bar' && layout === 'vertical',
    defaultChartSettings: {
      layout: 'vertical',
      groupMode: 'grouped',
    },
    defaultWidgetSettings: {},
  },
  {
    id: 'bar-horizontal',
    icon: 'bar-widget-horizontal',
    widget: 'bar',
    chartOptions: [MODE_OPTIONS],
    isActive: (widget, { layout }) =>
      widget === 'bar' && layout === 'horizontal',
    defaultChartSettings: {
      layout: 'horizontal',
      groupMode: 'grouped',
    },
    defaultWidgetSettings: {},
  },
  {
    id: 'donut',
    icon: 'donut-widget',
    widget: 'donut',
    isActive: widget => widget === 'donut',
    defaultChartSettings: {},
    defaultWidgetSettings: {},
  },
  {
    id: 'pie',
    icon: 'pie-widget',
    widget: 'pie',
    isActive: widget => widget === 'pie',
    defaultChartSettings: {},
    defaultWidgetSettings: {},
  },
  {
    id: 'line',
    icon: 'line-widget',
    widget: 'line',
    chartOptions: [LINE_CURVE_OPTIONS, MODE_OPTIONS],
    isActive: (widget, { areaMode }) => widget === 'line' && !areaMode,
    defaultChartSettings: {
      curve: 'linear',
      areaMode: false,
      stackMode: 'normal',
      groupMode: 'grouped',
    },
    defaultWidgetSettings: {},
  },
  {
    id: 'area',
    icon: 'area-widget',
    widget: 'line',
    chartOptions: [LINE_CURVE_OPTIONS, MODE_OPTIONS],
    isActive: (widget, { areaMode }) => widget === 'line' && areaMode,
    defaultChartSettings: {
      curve: 'linear',
      areaMode: true,
      stackMode: 'normal',
      groupMode: 'grouped',
    },
    defaultWidgetSettings: {},
  },
  {
    id: 'heatmap',
    icon: 'heatmap-widget',
    widget: 'heatmap',
    isActive: widget => widget === 'heatmap',
    defaultChartSettings: {},
    defaultWidgetSettings: {},
  },
  {
    id: 'choropleth',
    icon: 'close',
    widget: 'choropleth',
    isActive: widget => widget === 'choropleth',
    defaultChartSettings: {},
    defaultWidgetSettings: {
      geographicArea: 'us',
    },
  },
];
