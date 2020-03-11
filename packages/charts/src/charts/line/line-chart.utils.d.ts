import { ScaleLinear, ScaleTime } from 'd3-scale';
import { Options, Mark, Line, StepType } from './types';
export declare const groupMarksByPosition: (
  marks: Mark[]
) => Record<number, Mark[]>;
export declare const findMarksInCluster: (
  mark: StepType | Mark,
  marks: Record<number, Mark[]>,
  range?: number
) => Mark[];
export declare const calculateStackData: (
  data: any[],
  labelSelector: string,
  keys: string[]
) => any[];
export declare const generateGroupedLines: ({
  data,
  keys,
  disabledKeys,
  dimension,
  margins,
  minValue,
  maxValue,
  labelSelector,
  colors,
  markRadius,
  strokeWidth,
  curve,
}: Options) => {
  stepMode: boolean;
  steps: StepType[];
  marks: Mark[];
  lines: Line[];
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
};
export declare const generateStackLines: ({
  data,
  keys,
  disabledKeys,
  dimension,
  margins,
  minValue,
  maxValue,
  labelSelector,
  colors,
  markRadius,
  strokeWidth,
  curve,
}: Options) => {
  stepMode: boolean;
  steps: StepType[];
  marks: Mark[];
  lines: Line[];
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
};
export declare const generateLines: (
  options: Options
) => {
  stepMode: boolean;
  steps: StepType[];
  marks: Mark[];
  lines: Line[];
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
};
