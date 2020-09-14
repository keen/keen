import { Widget, ChartSettingsOption } from './types';

export const MODE_OPTIONS: {
  label: string;
  id: string;
  settings: ChartSettingsOption[];
} = {
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

export const LINE_CURVE_OPTIONS: {
  label: string;
  id: string;
  settings: ChartSettingsOption[];
} = {
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
    id: 'bar-vertical',
    icon: 'bar-vertical',
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
    icon: 'bar-horizontal',
    widget: 'bar',
    isActive: (widget, { layout }) =>
      widget === 'bar' && layout === 'horizontal',
    defaultSettings: {
      layout: 'horizontal',
      groupMode: 'grouped',
    },
  },
  {
    id: 'line',
    icon: 'line',
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
];
