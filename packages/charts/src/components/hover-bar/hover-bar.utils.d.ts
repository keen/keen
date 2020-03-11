import { Margins, Dimension } from '../../types';
declare type Options = {
  xMin: number;
  xMax: number;
  x: number;
  y?: number;
  margins: Margins;
  svgDimensions: Dimension;
};
export declare const BAR_WIDTH = 50;
export declare const calculateBarProperties: ({
  xMin,
  xMax,
  x,
  y,
  margins,
  svgDimensions,
}: Options) => {
  height: number;
  width: number;
  barX: number;
  barY: number;
};
export {};
