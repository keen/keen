import { Typography } from '@keen.io/ui-core';

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

export type Theme = {
  colors: string[];
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
