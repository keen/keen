import React from 'react';
import LineChart from '../line/line-chart.component';

import {
  ScaleSettings,
  CommonChartSettings,
  GroupMode,
  StackMode,
} from '../../types';

import { CurveType } from '../line/types';

export type Props = {
  /** chart data */
  data: object[];
  /** Name of data object property used to create labels on axis */
  labelSelector: string;
  /** Minimum value for axis */
  minValue?: number | 'auto';
  /** Maximum value for axis */
  maxValue?: number | 'auto';
  /** X axis title settings */
  xAxisTitle?: string;
  /** Y axis title settings */
  yAxisTitle?: string;
  /** Keys picked from data object used to generate lines */
  keys?: string[];
  /** Keys that are disabled for rendering data series */
  disabledKeys?: string[];
  /** Marks radius */
  markRadius?: number;
  /** Line thickness */
  strokeWidth?: number | 2;
  /** X scale settings */
  xScaleSettings?: ScaleSettings;
  /** Y scale settings */
  yScaleSettings?: ScaleSettings;
  /** Curve type */
  curve?: CurveType;
  /** Group mode */
  groupMode?: GroupMode;
  /** Stack mode */
  stackMode?: StackMode;
  /** Gradient on/off */
  gradient?: boolean;
} & CommonChartSettings;

export const AreaChart = (props: Props) => {
  return <LineChart {...props} areaMode={true} />;
};

export default AreaChart;
