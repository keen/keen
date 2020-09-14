import { GroupMode, StackMode, CurveType } from '@keen.io/charts';
import { Widgets } from '@keen.io/widgets';
import { Layout } from '@keen.io/ui-core';
import { IconType } from '@keen.io/icons';

export type Settings = {
  groupMode?: GroupMode;
  stackMode?: StackMode;
  layout?: Layout;
  curve?: CurveType;
  areaMode?: boolean;
};

export type ChartSettingsOption = {
  label: string;
  defaultSettings: Settings;
  isActive: (settings: Settings) => boolean;
};

export type Widget = {
  id: string;
  icon: IconType;
  widget: Widgets;
  defaultSettings: Settings;
  isActive: (widget: Widgets, settings: Settings) => boolean;
  chartOptions?: Array<{
    id: string;
    label: string;
    settings: ChartSettingsOption[];
  }>;
};
