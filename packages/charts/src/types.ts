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

export type Layout = 'vertical' | 'horizontal';

export enum Orientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export type Labels = {
  enabled: boolean;
  typhography: Typography;
};

export type Typography = {
  fontStyle: 'normal' | 'italic';
  fontWeight: 'normal' | 'bold';
  fontSize: number;
  fontColor: string;
};

export type Axis = {
  enabled: boolean;
  tickSize: number;
  tickPadding: number;
  color?: string;
  labels?: Labels;
};

export type Grid = {
  enabled: boolean;
  color: string;
};

export type ChartTheme = {
  colors: string[];
  axisX: Axis;
  axisY: Axis;
  gridX: Grid;
  gridY: Grid;
};

export type CommonChartProps = {
  theme: ChartTheme;
  svgDimensions: Dimension;
  margins: Margins;
};
