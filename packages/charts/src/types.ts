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
  labels: {
    typography: Typography;
  };
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
  height?: number;
  width?: number;
};

export type Metric = {
  value: {
    typography: Typography;
  };
  caption: {
    typography: Typography;
  };
  icon?: {
    enabled: boolean;
    position: 'top' | 'center' | 'bottom';
    margins: Margins;
    style: 'solid' | 'regular';
    type: IconType;
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

export type Bar = {
  values: {
    typography: Typography;
  };
};

export type Funnel = {
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

export type Choropleth = {
  map: {
    stroke: string;
  };
  graticule: Grid;
  sphere: {
    enabled: boolean;
    backgroundColor: string;
  };
};

export type Donut = {
  labels: {
    enabled: boolean;
    typography: Typography;
  };
  total: {
    enabled: boolean;
    label: {
      typography: Typography;
    };
    value: {
      typography: Typography;
    };
  };
};

export type Pie = {
  labels: {
    enabled: boolean;
    typography: Typography;
  };
};

export type Gauge = {
  labels: {
    enabled: boolean;
    typography: Typography;
  };
  border: {
    backgroundColor: string;
  };
  total: {
    enabled: boolean;
    typography: Typography;
  };
};
export type Table = {
  header: {
    typography: Typography;
  };
  body: {
    typography: Typography;
  };
};

export type Theme = {
  colors: string[];
  funnel: Funnel;
  choropleth: Choropleth;
  bar: Bar;
  metric?: Metric;
  donut: Donut;
  pie: Pie;
  gauge: Gauge;
  table: Table;
  tooltip?: Tooltip;
  axisX?: Axis;
  axisY?: Axis;
  gridX?: Grid;
  gridY?: Grid;
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
  formatLabel?: (label: string | number | Date) => string | number;
  precision?: TimePrecision;
};

export type Motion = {
  enabled: boolean;
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
