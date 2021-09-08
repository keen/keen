import { Layout, ColorMode, RangeType } from '@keen.io/ui-core';
import { Formatter, ScaleSettings } from '@keen.io/charts-utils';

import { Dimension, Margins } from '../../types';

export type Options = {
  data: any[];
  keys: string[];
  disabledKeys?: string[];
  labelSelector: string;
  layout: Layout;
  colorMode: ColorMode;
  steps: number;
  dimension: Dimension;
  colors: string[];
  margins: Margins;
  minValue?: number | 'auto';
  maxValue?: number | 'auto';
  xScaleSettings?: ScaleSettings;
  yScaleSettings?: ScaleSettings;
  range?: RangeType;
  xAxisTitle?: string;
  yAxisTitle?: string;
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

export type TooltipSettings = {
  formatValue?: Formatter;
};
