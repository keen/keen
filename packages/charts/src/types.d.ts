import { Typography, TooltipMode } from '@keen.io/ui-core';
import { IconType } from '@keen.io/icons';
export declare type Dimension = {
  width: number;
  height: number;
};
export declare type Margins = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
export declare type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
export declare type Tick = {
  text?: string | number;
  size: number;
  x: number;
  y: number;
};
export declare enum Orientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}
export declare type Labels = {
  enabled: boolean;
  typography: Typography;
  radiusAngle?: number;
};
export declare type Tooltip = {
  enabled: boolean;
  mode: TooltipMode;
  labels: {
    typography: Typography;
  };
};
export declare type Axis = {
  enabled: boolean;
  tickSize: number;
  tickPadding: number;
  stroke?: number;
  color?: string;
  labels?: Labels;
};
export declare type Grid = {
  enabled: boolean;
  color: string;
};
export declare type Icon = {
  color: string;
  type: IconType;
};
export declare type Metric = {
  label: {
    typography: Typography;
  };
  excerpt: {
    icons: {
      increase: Icon;
      decrease: Icon;
    };
    backgroundColor: string;
    typography: Typography;
  };
};
export declare type Funnel = {
  header: {
    value: {
      enabled: boolean;
      typography: Typography;
    };
    title: {
      typography: Typography;
    };
    badge: {
      enabled: boolean;
      typography: Typography;
    };
    backgroundColor: string;
  };
  step: {
    backgroundColor: string;
  };
};
export declare type Theme = {
  colors: string[];
  funnel: Funnel;
  metric?: Metric;
  tooltip?: Tooltip;
  axisX?: Axis;
  axisY?: Axis;
  gridX?: Grid;
  gridY?: Grid;
  labels?: Labels;
};
export declare type CommonChartSettings = {
  theme?: Theme;
  svgDimensions?: Dimension;
  margins?: Margins;
};
export declare type TooltipState = {
  visible: boolean;
  selectors: {
    selector: DataSelector;
    color: string;
  }[];
  x: number;
  y: number;
};
export declare type TimePrecision =
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year';
export declare type ScaleSettings = {
  type: 'time' | 'band' | 'linear';
  formatLabel?: (label: string | number | Date) => string | number;
  precision?: TimePrecision;
};
export declare type Motion = {
  enabled: boolean;
};
export declare type DataSelector = (number | string)[];
export declare type LabelRotation = {
  anchor: string;
  radius: number;
  translateX: number;
  translateY: number;
};
export declare type GroupMode = 'grouped' | 'stacked';
export declare type StackMode = 'normal' | 'percent';
