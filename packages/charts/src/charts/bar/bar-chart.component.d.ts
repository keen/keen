import { FC } from 'react';
import { Layout } from '@keen.io/ui-core';
import {
  CommonChartSettings,
  ScaleSettings,
  GroupMode,
  StackMode,
} from '../../types';
export declare type Props = {
  data: object[];
  labelSelector: string;
  minValue?: number | 'auto';
  maxValue?: number | 'auto';
  barPadding?: number;
  keys?: string[];
  disabledKeys?: string[];
  layout?: Layout;
  xScaleSettings?: ScaleSettings;
  yScaleSettings?: ScaleSettings;
  groupMode?: GroupMode;
  stackMode?: StackMode;
} & CommonChartSettings;
export declare const BarChart: FC<Props>;
export default BarChart;
