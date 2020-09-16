import { GroupMode, StackMode, CurveType } from '@keen.io/charts';
import { Widgets } from '@keen.io/widgets';
import { Layout } from '@keen.io/ui-core';
import { IconType } from '@keen.io/icons';

export type PickerWidgets = Widgets | 'json';

export type ChartSettings = {
  groupMode?: GroupMode;
  stackMode?: StackMode;
  layout?: Layout;
  curve?: CurveType;
  areaMode?: boolean;
  type?: 'percent' | 'difference' | 'compare';
};

export type WidgetSettings = {
  geographicArea?: 'us' | 'world';
};

export type ChartOptionItem = {
  label: string;
  defaultChartSettings?: ChartSettings;
  defaultWidgetSettings?: WidgetSettings;
  isActive: (settings: ChartSettings) => boolean;
};

export type ChartOptions = {
  label: string;
  id: string;
  settings: ChartOptionItem[];
};

export type Widget = {
  id: string;
  icon: IconType;
  widget: PickerWidgets;
  defaultChartSettings: ChartSettings;
  defaultWidgetSettings: WidgetSettings;
  isActive: (widget: PickerWidgets, settings: ChartSettings) => boolean;
  chartOptions?: Array<ChartOptions>;
};
