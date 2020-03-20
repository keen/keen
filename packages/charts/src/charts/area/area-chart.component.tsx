import React from 'react';
import LineChart from '../line/line-chart.component';

import { margins as defaultMargins, theme as defaultTheme } from '../../theme';

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

export const AreaChart = ({
  data,
  svgDimensions,
  labelSelector,
  theme = defaultTheme,
  margins = defaultMargins,
  minValue = 'auto',
  maxValue = 'auto',
  keys = ['value'],
  disabledKeys = [],
  markRadius = 4,
  strokeWidth = 1,
  curve = 'linear',
  stackMode = 'normal',
  groupMode = 'grouped',
  xScaleSettings = { precision: 'month', type: 'time' },
  yScaleSettings = { type: 'linear' },
  gradient = true,
}: Props) => {
  return (
    <LineChart
      data={data}
      svgDimensions={svgDimensions}
      labelSelector={labelSelector}
      theme={theme}
      margins={margins}
      minValue={minValue}
      maxValue={maxValue}
      keys={keys}
      disabledKeys={disabledKeys}
      markRadius={markRadius}
      strokeWidth={strokeWidth}
      curve={curve}
      stackMode={stackMode}
      groupMode={groupMode}
      xScaleSettings={xScaleSettings}
      yScaleSettings={yScaleSettings}
      gradient={gradient}
      areaMode={true}
    />
  );
};

export default AreaChart;
