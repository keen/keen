import { ScaleLinear } from 'd3-scale';
import { Layout } from '@keen.io/ui-core';
import { Dimension, Margins } from '../../../types';
declare type Options = {
  data: Record<string, any>[];
  key: string;
  colors: string[];
};
declare type Step = {
  percentageValue: number;
  nextPercentageValue: number;
  value: number;
  color: string;
  index: number;
};
export declare const calculateStepPoints: ({
  scale,
  dimension,
  margins,
  percentageValue,
  nextPercentageValue,
  layout,
}: {
  percentageValue: number;
  nextPercentageValue: number;
  scale: ScaleLinear<number, number>;
  dimension: Dimension;
  margins: Margins;
  layout: Layout;
}) => string;
export declare const generateFunnel: ({
  data,
  key,
  colors,
}: Options) => {
  steps: Step[];
  scale: ScaleLinear<number, number>;
};
export {};
