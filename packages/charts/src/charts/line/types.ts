import { ScaleSettings } from '@keen.io/charts-utils';

import { Dimension, Margins, StackMode, GroupMode } from '../../types';

export type Options = {
  data: Record<string, any>[];
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
  activeKey?: string;
  sortedKeys?: string[];
  dataSeriesOffset?: [number, number];
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
  dataSerieKey: string;
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
  id: string;
  d: string;
  positiveColor: string;
  zeroPointColor: string;
  negativeColor: string;
  gradientZeroPercent: number;
};

export type GradientBlockType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type KeyNamesValuesType = {
  [index: string]: {
    min: number;
    max: number;
  };
};

export type CurveType = 'linear' | 'spline' | 'step';
