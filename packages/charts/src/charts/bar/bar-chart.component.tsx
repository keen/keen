import React, { FC } from 'react';

import { Layout } from '@keen.io/ui-core';

import { generateBars } from './bar-chart.utils';

import Bars from './bars.component';

import { ChartBase, Grid, Axes } from '../../components';

import { CommonChartSettings } from '../../types';

export type Props = {
  /** Chart data */
  data: object[];
  /** Name of data object property used to create labels on axis */
  labelSelector: string;
  /** Minimum value for axis */
  minValue?: number | 'auto';
  /** Maximum value for axis */
  maxValue?: number | 'auto';
  /** Padding between bar groups */
  barPadding?: number;
  /** Keys picked from data object used to genrate bars */
  keys?: string[];
  /** Layout applied on chart bars */
  layout?: Layout;
} & CommonChartSettings;

export const BarChart: FC<Props> = ({
  data,
  margins,
  svgDimensions,
  labelSelector,
  theme,
  layout = 'vertical',
  minValue = 'auto',
  maxValue = 'auto',
  keys = ['value'],
  barPadding = 0.1,
}) => {
  const { bars, xScale, yScale } = generateBars({
    data,
    margins,
    dimension: svgDimensions,
    labelSelector,
    barPadding,
    layout,
    keys,
    minValue,
    maxValue,
    colors: theme.colors,
  });

  return (
    <ChartBase theme={theme} svgDimensions={svgDimensions} margins={margins}>
      <Grid xScale={xScale} yScale={yScale} />
      <Axes xScale={xScale} yScale={yScale} />
      <Bars bars={bars} layout={layout} />
    </ChartBase>
  );
};

export default BarChart;
