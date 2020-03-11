import { Margins, Dimension } from '../../types';
declare type Options = {
  x: number;
  y: number;
  width: number;
  height: number;
  margins: Margins;
  svgDimensions: Dimension;
};
export declare const calculateTooltipPosition: ({
  svgDimensions,
  margins,
  x,
  width,
}: Options) => {
  transform: string;
  arrowDirection: string;
  tooltipX: number;
};
export {};
