import { ScaleSettings } from '@keen.io/charts-utils';

import { Dimension, Margins, StackMode, GroupMode } from '../../types';

export type Options = {
  data: any[];
  xScaleSettings: ScaleSettings;
  yScaleSettings: ScaleSettings;
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
  areaMode?: boolean;
};

export type Line = {
  key: string;
  d: string;
  selector: (string | number)[];
  color: string;
  strokeWidth: number;
};

export type Mark = {
  key: string;
  radius: number;
  color: string;
  selector: (number | string)[];
  x: number;
  y: number;
};

export type StepType = {
  key: string;
  selector: (number | string)[];
  x: number;
  y: number;
  width: number;
  height: number;
  middle: number;
};

export type AreaType = {
  d: string;
  firstOpacity: number;
  lastOpacity: number;
};

export type CurveType = 'linear' | 'spline' | 'step';
