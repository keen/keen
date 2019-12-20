import React from 'react';

import { generateBars } from './bar-chart.utils';

import Bars from './bars.component';

import { ChartBase, CartesianGrid, Axes } from '../components';

import { CommonChartProps, Layout } from '../types';

type Props = {
  data: object[];
  labelSelector: string;
  minValue?: number | 'auto';
  maxValue?: number | 'auto';
  barPadding?: number;
  keys?: string[];
  layout?: Layout;
} & CommonChartProps;

const BarChart = ({
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
}: Props) => {
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
    <>
      <ChartBase theme={theme} svgDimensions={svgDimensions} margins={margins}>
        <CartesianGrid xScale={xScale} yScale={yScale} />
        <Axes xScale={xScale} yScale={yScale} />
        <Bars bars={bars} />
      </ChartBase>
    </>
  );
};

export default BarChart;
