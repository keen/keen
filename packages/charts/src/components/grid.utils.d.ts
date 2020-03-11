import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { Dimension, Margins, Line, ScaleSettings } from '../types';
export declare enum AxisType {
  X = 'x',
  Y = 'y',
}
declare type Options = {
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  dimension: Dimension;
  margins: Margins;
  axisType: AxisType;
  scaleSettings?: ScaleSettings;
};
export declare const calculateVerticalLines: (
  { width, height }: Dimension,
  { top, bottom, left, right }: Margins
) => Line[];
export declare const calculateHorizontalLines: (
  { width, height }: Dimension,
  { top, bottom, left, right }: Margins
) => Line[];
export declare const generateGridLines: ({
  scale,
  scaleSettings,
  dimension,
  margins,
  axisType,
}: Options) => Line[];
export {};
