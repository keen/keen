import { Dimension, Margins } from '../../types';
import { Layout } from '@keen.io/ui-core';

import { ScaleSettings } from '../../types';

export type Options = {
  data: any[];
  keys: string[];
  disabledKeys?: string[];
  labelSelector: string;
  layout: Layout;
  dimension: Dimension;
  margins: Margins;
  minValue?: number | 'auto';
  maxValue?: number | 'auto';
  xScaleSettings?: ScaleSettings;
  yScaleSettings?: ScaleSettings;
};

export type BlockType = {
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
  selector: (string | number)[];
  color: string;
};
