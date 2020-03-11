import { FC } from 'react';
import {
  ScaleSettings,
  CommonChartSettings,
  GroupMode,
  StackMode,
} from '../../types';
import { CurveType } from './types';
export declare type Props = {
  data: object[];
  labelSelector: string;
  minValue?: number | 'auto';
  maxValue?: number | 'auto';
  keys?: string[];
  disabledKeys?: string[];
  markRadius?: number;
  strokeWidth?: number | 2;
  xScaleSettings?: ScaleSettings;
  yScaleSettings?: ScaleSettings;
  curve?: CurveType;
  groupMode?: GroupMode;
  stackMode?: StackMode;
} & CommonChartSettings;
export declare const LineChart: FC<Props>;
export default LineChart;
