import { Layout, ColorMode } from '@keen.io/ui-core';
import { RangeType } from '@keen.io/ui-core';
import { Dimension, Margins, ScaleSettings } from '../../types';

export type Options = {
  data: any[];
  keys: string[];
  disabledKeys?: string[];
  labelSelector: string;
  layout: Layout;
  colorMode: ColorMode;
  steps: number;
  dimension: Dimension;
  margins: Margins;
  minValue?: number | 'auto';
  maxValue?: number | 'auto';
  xScaleSettings?: ScaleSettings;
  yScaleSettings?: ScaleSettings;
  range?: RangeType;
};

export type BlockType = {
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
  selector: (string | number)[];
  color: string;
  value: number;
};
