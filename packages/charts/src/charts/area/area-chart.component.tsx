import React from 'react';
import { ScaleSettings } from '@keen.io/charts-utils';

import LineChart from '../line/line-chart.component';

import {
  CommonChartSettings,
  GroupMode,
  StackMode,
  TooltipFormatter,
} from '../../types';

import { CurveType } from '../line/types';

export type Props = {
  /** chart data */
  data: Record<string, any>[];
  /** Name of data object property used to create labels on axis */
  labelSelector: string;
  /** Minimum value for axis */
  minValue?: number | 'auto';
  /** Maximum value for axis */
  maxValue?: number | 'auto';
  /** Title for X axis */
  xAxisTitle?: string;
  /** Title for Y axis */
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
  /** Automatically adjusts margins for visualization */
  useDynamicLayout?: boolean;
  /** Tooltip formatter */
  formatTooltip?: TooltipFormatter;
} & CommonChartSettings;

export const AreaChart = (props: Props) => {
  return <LineChart {...props} areaMode />;
};

export default AreaChart;
