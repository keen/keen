import { GroupMode, StackMode, CurveType, MetricType } from '@keen.io/charts';
import {
  Widgets,
  WidgetSettings as BaseWidgetSettings,
} from '@keen.io/widgets';
import { Layout } from '@keen.io/ui-core';
import { IconType } from '@keen.io/icons';

export type PickerWidgets = Widgets | 'json';

export type ChartSettings = {
  groupMode?: GroupMode;
  stackMode?: StackMode;
  layout?: Layout;
  curve?: CurveType;
  areaMode?: boolean;
  usePercentDifference?: boolean;
  type?: MetricType;
};

export type WidgetSettings = Partial<BaseWidgetSettings>;

export type OptionValue = ChartSettings | WidgetSettings;

export type OptionItem = {
  label: string;
  defaultValue: OptionValue;
  isActive: (settings: ChartSettings | WidgetSettings) => boolean;
};

export type OptionsGroup = {
  label: string;
  id: string;
  settings: OptionItem[];
};

export type Widget = {
  id: PickerWidgets;
  icon: IconType;
  widget: PickerWidgets;
  defaultChartSettings: ChartSettings;
  defaultWidgetSettings: WidgetSettings;
  isActive: (
    widget: PickerWidgets,
    settings: ChartSettings | WidgetSettings
  ) => boolean;
  chartOptions?: Array<OptionsGroup>;
  widgetOptions?: Array<OptionsGroup>;
};
