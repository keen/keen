import { Widget, ChartOptions } from './types';

export const MODE_OPTIONS: ChartOptions = {
  label: 'Mode',
  id: 'mode',
  settings: [
    {
      label: 'Grouped',
      isActive: ({ groupMode }) => groupMode === 'grouped',
      defaultSettings: {
        groupMode: 'grouped',
        stackMode: undefined,
      },
    },
    {
      label: 'Stacked Normal',
      isActive: ({ groupMode, stackMode }) =>
        groupMode === 'stacked' && stackMode === 'normal',
      defaultSettings: {
        groupMode: 'stacked',
        stackMode: 'normal',
      },
    },
    {
      label: 'Stacked %',
      isActive: ({ groupMode, stackMode }) =>
        groupMode === 'stacked' && stackMode === 'percent',
      defaultSettings: {
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
      defaultSettings: {
        curve: 'linear',
      },
    },
    {
      label: 'Spline',
      isActive: ({ curve }) => curve === 'spline',
      defaultSettings: {
        curve: 'spline',
      },
    },
    {
      label: 'Steps',
      isActive: ({ curve }) => curve === 'step',
      defaultSettings: {
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
    defaultSettings: {},
  },
  {
    id: 'json',
    icon: 'json',
    widget: 'json',
    isActive: widget => widget === 'json',
    defaultSettings: {},
  },
  {
    id: 'metric',
    icon: 'metric-widget',
    widget: 'metric',
    isActive: widget => widget === 'metric',
    defaultSettings: {},
  },
  {
    id: 'bar-vertical',
    icon: 'bar-widget-vertical',
    widget: 'bar',
    chartOptions: [MODE_OPTIONS],
    isActive: (widget, { layout }) => widget === 'bar' && layout === 'vertical',
    defaultSettings: {
      layout: 'vertical',
      groupMode: 'grouped',
    },
  },
  {
    id: 'bar-horizontal',
    icon: 'bar-widget-horizontal',
    widget: 'bar',
    chartOptions: [MODE_OPTIONS],
    isActive: (widget, { layout }) =>
      widget === 'bar' && layout === 'horizontal',
    defaultSettings: {
      layout: 'horizontal',
      groupMode: 'grouped',
    },
  },
  {
    id: 'donut',
    icon: 'donut-widget',
    widget: 'donut',
    isActive: widget => widget === 'donut',
    defaultSettings: {},
  },
  {
    id: 'pie',
    icon: 'pie-widget',
    widget: 'pie',
    isActive: widget => widget === 'pie',
    defaultSettings: {},
  },
  {
    id: 'line',
    icon: 'line-widget',
    widget: 'line',
    chartOptions: [LINE_CURVE_OPTIONS, MODE_OPTIONS],
    isActive: (widget, { areaMode }) => widget === 'line' && !areaMode,
    defaultSettings: {
      curve: 'linear',
      areaMode: false,
      stackMode: 'normal',
      groupMode: 'grouped',
    },
  },
  {
    id: 'area',
    icon: 'area-widget',
    widget: 'line',
    chartOptions: [LINE_CURVE_OPTIONS, MODE_OPTIONS],
    isActive: (widget, { areaMode }) => widget === 'line' && areaMode,
    defaultSettings: {
      curve: 'linear',
      areaMode: true,
      stackMode: 'normal',
      groupMode: 'grouped',
    },
  },
  {
    id: 'heatmap',
    icon: 'heatmap-widget',
    widget: 'heatmap',
    isActive: widget => widget === 'heatmap',
    defaultSettings: {},
  },
];
