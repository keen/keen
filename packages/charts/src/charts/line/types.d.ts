import { Dimension, Margins, StackMode, GroupMode } from '../../types';
export declare type Options = {
  data: any[];
  keys: string[];
  disabledKeys?: string[];
  labelSelector: string;
  dimension: Dimension;
  margins: Margins;
  minValue?: number | 'auto';
  maxValue?: number | 'auto';
  colors: string[];
  markRadius: number;
  strokeWidth: number;
  curve: CurveType;
  groupMode?: GroupMode;
  stackMode?: StackMode;
};
export declare type Line = {
  key: string;
  d: string;
  selector: (string | number)[];
  color: string;
  strokeWidth: number;
};
export declare type Mark = {
  key: string;
  radius: number;
  color: string;
  selector: (number | string)[];
  x: number;
  y: number;
};
export declare type StepType = {
  key: string;
  selector: (number | string)[];
  x: number;
  y: number;
  width: number;
  height: number;
  middle: number;
};
export declare type CurveType = 'linear' | 'spline' | 'step';
