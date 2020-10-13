import React, { useContext, useEffect } from 'react';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { Layout } from '@keen.io/ui-core';

import Ruler from '../ruler.component';

import { ChartContext, ChartContextType } from '../../contexts';

import { calculateAxisDimension, getMaxDimensionValue } from './utils';

import { Orientation, Margins } from '../../types';

type Props = {
  /* X scale definition */
  xScale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  /* Y scale definition */
  yScale: ScaleBand<string> | ScaleLinear<number, number>;
  /** Initial SVG element margins */
  initialMargins: Margins;
  /** Visualization layout */
  layout?: Layout;
  /** Compute axes layout margins event handler */
  onComputeLayout?: (margins: Margins) => void;
  /** Adjust margins based on labels */
  useDynamicLayout?: boolean;
  /** Axis X Title */
  xTitle?: string;
  /** Axis Y Title */
  yTitle?: string;
};

const Axes = ({
  xScale,
  yScale,
  xTitle,
  yTitle,
  layout,
  onComputeLayout,
  initialMargins,
  useDynamicLayout = false,
}: Props) => {
  const {
    theme,
    margins,
    svgDimensions,
    xScaleSettings,
    yScaleSettings,
  } = useContext(ChartContext) as ChartContextType;

  useEffect(() => {
    if (useDynamicLayout) {
      const sizeAxisX = calculateAxisDimension({
        label: getMaxDimensionValue(xScale, xScaleSettings),
        axisTheme: theme.axisX,
        orientation: Orientation.HORIZONTAL,
        axisTitle: xTitle,
      });

      const sizeAxisY = calculateAxisDimension({
        label: getMaxDimensionValue(yScale, yScaleSettings),
        axisTheme: theme.axisY,
        orientation: Orientation.VERTICAL,
        axisTitle: yTitle,
      });

      onComputeLayout({
        top: initialMargins.top,
        right: initialMargins.right,
        left: initialMargins.left + sizeAxisY.width,
        bottom: initialMargins.bottom + sizeAxisX.height,
      });
    }
  }, [useDynamicLayout, layout, initialMargins, xTitle, yTitle]);

  const axisX = theme.axisX.enabled && {
    x: 0,
    y: svgDimensions.height - margins.bottom + theme.axisX.padding,
    scale: xScale,
    scaleSettings: xScaleSettings,
    orientation: Orientation.HORIZONTAL,
    axisTitle: xTitle,
  };

  const axisY = theme.axisY.enabled && {
    x: margins.left - theme.axisY.padding,
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
