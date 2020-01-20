import React, { FC } from 'react';

import { generateLines } from './line-chart.utils';

import Lines from './lines.component';

import { ChartBase, Axes, Grid } from '../../components';

import { CommonChartSettings } from '../../types';

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
  /** Marks radius */
  markRadius?: number | 4;
  /** Line thickness */
  strokeWidth?: number | 2;
  /** Function for date format */
  formatLabelHorizontal?: (label: any) => string | number;
} & CommonChartSettings;

export const LineChart: FC<Props> = ({
  data,
  margins,
  svgDimensions,
  labelSelector,
  theme,
  minValue = 'auto',
  maxValue = 'auto',
  keys = ['value'],
  markRadius = 4,
  strokeWidth = 1,
  formatLabelHorizontal,
}) => {
  const { lines, xScale, yScale } = generateLines({
    data,
    margins,
    dimension: svgDimensions,
    labelSelector,
    keys,
    minValue,
    maxValue,
    colors: theme.colors,
    markRadius,
    strokeWidth,
  });
  return (
    <ChartBase theme={theme} svgDimensions={svgDimensions} margins={margins}>
      <Grid xScale={xScale} yScale={yScale} />
      <Axes
        xScale={xScale}
        yScale={yScale}
        formatLabelHorizontal={formatLabelHorizontal}
      />
      <Lines lines={lines} />
    </ChartBase>
  );
};

export default LineChart;
