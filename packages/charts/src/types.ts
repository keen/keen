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

export type Layout = 'vertical' | 'horizontal';

export type AxisSettins = {
  enabled: boolean;
  tickSize: number;
  tickPadding: number;
};

export type GridSettings = {
  enabled: boolean;
  color: string;
};

export type ChartTheme = {
  colors: string[];
  axisX: AxisSettins;
  axisY: AxisSettins;
  gridX: GridSettings;
  gridY: GridSettings;
};

export type CommonChartProps = {
  theme: ChartTheme;
  svgDimensions: Dimension;
  margins: Margins;
};
