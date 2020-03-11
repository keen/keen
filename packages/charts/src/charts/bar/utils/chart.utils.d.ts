import { Layout } from '@keen.io/ui-core';
import { Bar } from '../types';
import {
  Dimension,
  Margins,
  ScaleSettings,
  GroupMode,
  StackMode,
} from '../../../types';
declare type Options = {
  data: Record<string, any>[];
  keys: string[];
  disabledKeys: string[];
  labelSelector: string;
  dimension: Dimension;
  margins: Margins;
  layout: Layout;
  barPadding: number;
  groupMode: GroupMode;
  stackMode: StackMode;
  minValue?: number | 'auto';
  maxValue?: number | 'auto';
  colors: string[];
  xScaleSettings: ScaleSettings;
  yScaleSettings: ScaleSettings;
};
export declare const generateHorizontalGroupedBars: ({
  data,
  keys,
  disabledKeys,
  dimension,
  margins,
  minValue,
  maxValue,
  barPadding,
  labelSelector,
  colors,
}: Options) => {
  bars: any[];
  xScale: import('d3-scale').ScaleLinear<number, number>;
  yScale: import('d3-scale').ScaleBand<string>;
};
export declare const generateVerticalGroupedBars: ({
  data,
  dimension,
  margins,
  minValue,
  maxValue,
  barPadding,
  keys,
  disabledKeys,
  colors,
  labelSelector,
}: Options) => {
  bars: any[];
  xScale: import('d3-scale').ScaleBand<string>;
  yScale: import('d3-scale').ScaleLinear<number, number>;
};
export declare const generateHorizontalStackedBars: ({
  data,
  dimension,
  margins,
  minValue,
  maxValue,
  barPadding,
  keys,
  disabledKeys,
  colors,
  stackMode,
  labelSelector,
}: Options) => {
  bars: Bar[];
  xScale: import('d3-scale').ScaleLinear<number, number>;
  yScale: import('d3-scale').ScaleBand<string>;
};
export declare const generateVerticalStackedBars: ({
  data,
  dimension,
  margins,
  minValue,
  maxValue,
  barPadding,
  keys,
  disabledKeys,
  colors,
  stackMode,
  labelSelector,
}: Options) => {
  bars: Bar[];
  xScale: import('d3-scale').ScaleBand<string>;
  yScale: import('d3-scale').ScaleLinear<number, number>;
};
export declare const generateBars: (options: Options) => any;
export {};
