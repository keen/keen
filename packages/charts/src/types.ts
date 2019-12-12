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

export type AxisSettins = {
  enabled: boolean;
  tickSize: number;
  tickPadding: number;
};

export type ChartTheme = {
  colors: string[];
  axisX: AxisSettins;
  axisY: AxisSettins;
};

export type CommonChartProps = {
  theme: ChartTheme;
  svgDimensions: Dimension;
  margins: Margins;
};
