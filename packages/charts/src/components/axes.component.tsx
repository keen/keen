import React, { useContext } from 'react';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';

import Ruler from './ruler.component';

import { ChartContext, ChartContextType } from '../contexts';

import { Orientation } from '../types';
import { Layout } from '@keen.io/ui-core';

type Props = {
  xScale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  yScale: ScaleBand<string> | ScaleLinear<number, number>;
  xTitle?: string;
  yTitle?: string;
  layout?: Layout;
};

const X_AXIS_PADDING = 5;

const Axes = ({ xScale, yScale, xTitle, yTitle, layout }: Props) => {
  const {
    theme,
    margins,
    svgDimensions,
    xScaleSettings,
    yScaleSettings,
  } = useContext(ChartContext) as ChartContextType;

  const axisX = theme.axisX.enabled && {
    x: 0,
    y: svgDimensions.height - margins.bottom + X_AXIS_PADDING,
    scale: xScale,
    scaleSettings: xScaleSettings,
    orientation: Orientation.HORIZONTAL,
    axisTitle: xTitle,
    layout,
  };

  const axisY = theme.axisY.enabled && {
    x: margins.left - X_AXIS_PADDING,
    y: 0,
    scale: yScale,
    scaleSettings: yScaleSettings,
    orientation: Orientation.VERTICAL,
    axisTitle: yTitle,
    layout,
  };

  const xAxisTheme = layout === 'vertical' ? theme.axisY : theme.axisX;
  const yAxisTheme = layout === 'vertical' ? theme.axisX : theme.axisY;

  return (
    <>
      {axisX && <Ruler {...axisX} {...xAxisTheme} />}
      {axisY && <Ruler {...axisY} {...yAxisTheme} />}
    </>
  );
};

export default Axes;
