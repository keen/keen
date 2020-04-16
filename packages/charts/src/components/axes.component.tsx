import React, { useContext } from 'react';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';

import Ruler from './ruler.component';

import { ChartContext, ChartContextType } from '../contexts';

import { Orientation } from '../types';

type Props = {
  xScale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  yScale: ScaleBand<string> | ScaleLinear<number, number>;
  xTitle?: string;
  yTitle?: string;
};

const X_AXIS_PADDING = 5;

const Axes = ({ xScale, yScale, xTitle, yTitle }: Props) => {
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
  };

  const axisY = theme.axisY.enabled && {
    x: margins.left - X_AXIS_PADDING,
    y: 0,
    scale: yScale,
    scaleSettings: yScaleSettings,
    orientation: Orientation.VERTICAL,
    axisTitle: yTitle,
  };

  return (
    <>
      {axisX && <Ruler {...axisX} {...theme.axisX} />}
      {axisY && <Ruler {...axisY} {...theme.axisY} />}
    </>
  );
};

export default Axes;
