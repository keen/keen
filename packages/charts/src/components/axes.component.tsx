import React, { useContext } from 'react';
import { ScaleBand, ScaleLinear } from 'd3-scale';

import Axis, { Orientation } from './axis.component';

import { ChartContext, ChartContextType } from '../contexts';

type Props = {
  xScale: ScaleBand<string> | ScaleLinear<number, number>;
  yScale: ScaleBand<string> | ScaleLinear<number, number>;
};

const Axes = ({ xScale, yScale }: Props) => {
  const { theme, margins, svgDimensions } = useContext(
    ChartContext
  ) as ChartContextType;

  const axisX = theme.axisX.enabled && {
    x: 0,
    y: svgDimensions.height - margins.bottom,
    orientation: Orientation.BOTTOM,
    scale: xScale,
  };

  const axisY = theme.axisY.enabled && {
    x: margins.left,
    y: 0,
    orientation: Orientation.LEFT,
    scale: yScale,
  };

  return (
    <>
      {axisX && <Axis {...axisX} scale={xScale} {...theme.axisX} />}
      {axisY && <Axis {...axisY} scale={yScale} {...theme.axisY} />}
    </>
  );
};

export default Axes;
