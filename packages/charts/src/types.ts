import { Typography, TooltipMode } from '@keen.io/ui-core';
import { IconType } from '@keen.io/icons';

export type Dimension = {
  width: number;
  height: number;
};

export type Margins = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export type Tick = {
  text?: string | number;
  size: number;
  x: number;
  y: number;
};

export enum Orientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export type Labels = {
  enabled: boolean;
  typography: Typography;
  radiusAngle?: number;
};

export type Tooltip = {
  enabled: boolean;
  mode: TooltipMode;
};

export type Axis = {
  enabled: boolean;
  tickSize: number;
  tickPadding: number;
  stroke?: number;
  color?: string;
  labels?: Labels;
};

export type Grid = {
  enabled: boolean;
  color: string;
};

export type Icon = {
  color: string;
  type: IconType;
};

export type Metric = {
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

export type Theme = {
  colors: string[];
  metric?: Metric;
  tooltip?: Tooltip;
  axisX?: Axis;
  axisY?: Axis;
  gridX?: Grid;
  gridY?: Grid;
  labels?: Labels;
};

export type CommonChartSettings = {
  /** Theme using for chart styling */
  theme?: Theme;
  /** SVG height and width */
  svgDimensions?: Dimension;
  /** SVG margins */
  margins?: Margins;
};

export type TooltipState = {
  visible: boolean;
  selectors: { selector: DataSelector; color: string }[];
  x: number;
  y: number;
};

export type TimePrecision =
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year';

export type ScaleSettings = {
  type: 'time' | 'band' | 'linear';
  formatLabel?: (label: string | number) => string | number;
  precision?: TimePrecision;
};

export type DataSelector = (number | string)[];

export type LabelRotation = {
  anchor: string;
  radius: number;
  translateX: number;
  translateY: number;
};

export type GroupMode = 'grouped' | 'stacked';

export type StackMode = 'normal' | 'percent';
