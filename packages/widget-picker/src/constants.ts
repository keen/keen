import { Widget, OptionsGroup, ChartSettings, WidgetSettings } from './types';

export const MODE_OPTIONS: OptionsGroup = {
  label: 'Mode',
  id: 'mode',
  settings: [
    {
      label: 'Grouped',
      isActive: ({ groupMode }: ChartSettings) => groupMode === 'grouped',
      defaultValue: {
        groupMode: 'grouped',
        stackMode: undefined,
      },
    },
    {
      label: 'Stacked Normal',
      isActive: ({ groupMode, stackMode }: ChartSettings) =>
        groupMode === 'stacked' && stackMode === 'normal',
      defaultValue: {
        groupMode: 'stacked',
        stackMode: 'normal',
      },
    },
    {
      label: 'Stacked %',
      isActive: ({ groupMode, stackMode }: ChartSettings) =>
        groupMode === 'stacked' && stackMode === 'percent',
      defaultValue: {
        groupMode: 'stacked',
        stackMode: 'percent',
      },
    },
  ],
};

export const METRIC_TYPE_OPTIONS: OptionsGroup = {
  label: 'Type',
  id: 'metric-type',
  settings: [
    {
      label: 'Simple',
      isActive: ({ type }: ChartSettings) => type === 'simple',
      defaultValue: {
        type: 'simple',
        usePercentDifference: false,
      },
    },
    {
      label: 'Comparison',
      isActive: ({ type }: ChartSettings) => type === 'comparison',
      defaultValue: {
        type: 'comparison',
        usePercentDifference: false,
      },
    },
    {
      label: 'Difference',
      isActive: ({ type, usePercentDifference }: ChartSettings) =>
        type === 'difference' && !usePercentDifference,
      defaultValue: {
        type: 'difference',
        usePercentDifference: false,
      },
    },
    {
      label: 'Difference %',
      isActive: ({ type, usePercentDifference }: ChartSettings) =>
        type === 'difference' && usePercentDifference,
      defaultValue: {
        type: 'difference',
        usePercentDifference: true,
      },
    },
  ],
};

export const LINE_CURVE_OPTIONS: OptionsGroup = {
  label: 'Shape',
  id: 'line-shape',
  settings: [
    {
      label: 'Line',
      isActive: ({ curve }: ChartSettings) => curve === 'linear',
      defaultValue: {
        curve: 'linear',
      },
    },
    {
      label: 'Spline',
      isActive: ({ curve }: ChartSettings) => curve === 'spline',
      defaultValue: {
        curve: 'spline',
      },
    },
    {
      label: 'Steps',
      isActive: ({ curve }: ChartSettings) => curve === 'step',
      defaultValue: {
        curve: 'step',
      },
    },
  ],
};

export const GEOGRAPHIC_AREA_OPTIONS: OptionsGroup = {
  label: 'Map',
  id: 'geographic-area',
  settings: [
    {
      label: 'World',
      isActive: ({ geographicArea }: WidgetSettings) =>
        geographicArea === 'world',
      defaultValue: {
        geographicArea: 'world',
      },
    },
    {
      label: 'United States',
      isActive: ({ geographicArea }: WidgetSettings) => geographicArea === 'us',
      defaultValue: {
        geographicArea: 'us',
      },
    },
  ],
};

export const GAUGE_CHART_OPTIONS: OptionsGroup = {
  label: 'Type',
  id: 'gauge-type',
  settings: [
    {
      label: 'Normal',
      isActive: ({ progressType }: ChartSettings) => progressType === 'normal',
      defaultValue: {
        progressType: 'normal',
      },
    },
    {
      label: 'Percent',
      isActive: ({ progressType }: ChartSettings) => progressType === 'percent',
      defaultValue: {
        progressType: 'percent',
      },
    },
  ],
};

export const WIDGETS: Widget[] = [
  {
    id: 'table',
    icon: 'table-widget',
    widget: 'table',
    isActive: (widget) => widget === 'table',
    defaultChartSettings: {},
    defaultWidgetSettings: {},
  },
  {
    id: 'json',
    icon: 'json',
    widget: 'json',
    isActive: (widget) => widget === 'json',
    defaultChartSettings: {},
    defaultWidgetSettings: {},
  },
  {
    id: 'metric',
    icon: 'metric-widget',
    widget: 'metric',
    chartOptions: [METRIC_TYPE_OPTIONS],
    isActive: (widget) => widget === 'metric',
    defaultChartSettings: {
      type: 'simple',
    },
    defaultWidgetSettings: {},
  },
  {
    id: 'bar',
    icon: 'bar-widget-vertical',
    widget: 'bar',
    chartOptions: [MODE_OPTIONS],
    isActive: (widget, { layout }: ChartSettings) =>
      widget === 'bar' && layout === 'vertical',
    defaultChartSettings: {
      layout: 'vertical',
      groupMode: 'grouped',
    },
    defaultWidgetSettings: {},
  },
  {
    id: 'bar',
    icon: 'bar-widget-horizontal',
    widget: 'bar',
    chartOptions: [MODE_OPTIONS],
    isActive: (widget, { layout }: ChartSettings) =>
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
    isActive: (widget) => widget === 'donut',
    defaultChartSettings: {},
    defaultWidgetSettings: {},
  },
  {
    id: 'pie',
    icon: 'pie-widget',
    widget: 'pie',
    isActive: (widget) => widget === 'pie',
    defaultChartSettings: {},
    defaultWidgetSettings: {},
  },
  {
    id: 'line',
    icon: 'line-widget',
    widget: 'line',
    chartOptions: [LINE_CURVE_OPTIONS, MODE_OPTIONS],
    isActive: (widget) => widget === 'line',
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
    widget: 'area',
    chartOptions: [LINE_CURVE_OPTIONS, MODE_OPTIONS],
    isActive: (widget) => widget === 'area',
    defaultChartSettings: {
      curve: 'linear',
      stackMode: 'normal',
      groupMode: 'grouped',
    },
    defaultWidgetSettings: {},
  },
  {
    id: 'funnel',
    icon: 'funnel-widget-vertical',
    widget: 'funnel',
    isActive: (widget, { layout }: ChartSettings) =>
      widget === 'funnel' && layout === 'vertical',
    defaultChartSettings: {
      layout: 'vertical',
    },
    defaultWidgetSettings: {},
  },
  {
    id: 'funnel',
    icon: 'funnel-widget-horizontal',
    widget: 'funnel',
    isActive: (widget, { layout }: ChartSettings) =>
      widget === 'funnel' && layout === 'horizontal',
    defaultChartSettings: {
      layout: 'horizontal',
    },
    defaultWidgetSettings: {},
  },
  {
    id: 'heatmap',
    icon: 'heatmap-widget',
    widget: 'heatmap',
    isActive: (widget) => widget === 'heatmap',
    defaultChartSettings: {},
    defaultWidgetSettings: {},
  },
  {
    id: 'choropleth',
    icon: 'choropleth-widget',
    widget: 'choropleth',
    widgetOptions: [GEOGRAPHIC_AREA_OPTIONS],
    isActive: (widget) => widget === 'choropleth',
    defaultChartSettings: {},
    defaultWidgetSettings: {
      geographicArea: 'world',
    },
  },
  {
    id: 'gauge',
    icon: 'gauge-widget',
    widget: 'gauge',
    chartOptions: [GAUGE_CHART_OPTIONS],
    isActive: (widget) => widget === 'gauge',
    defaultChartSettings: {
      progressType: 'normal',
    },
    defaultWidgetSettings: {},
  },
];
