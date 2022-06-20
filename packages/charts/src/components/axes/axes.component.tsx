import React, {
  MutableRefObject,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { Layout } from '@keen.io/ui-core';

import Ruler from '../ruler';

import { ChartContext, ChartContextType } from '../../contexts';

import {
  setXLabelsDimension,
  setYLabelsDimension,
  calculateAxisDimension,
} from './utils';

import { Orientation, Margins } from '../../types';

type Props = {
  /* Root visualization element */
  svgElement?: MutableRefObject<SVGElement>;
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
  svgElement,
  useDynamicLayout = false,
}: Props) => {
  const { theme, margins, svgDimensions, xScaleSettings, yScaleSettings } =
    useContext(ChartContext) as ChartContextType;

  const xLabelsDimension = theme.axisY.enabled
    ? setXLabelsDimension({
        scale: xScale,
        axisTheme: theme.axisX,
        svgDimensions,
      })
    : null;

  const yLabelsDimension = theme.axisY.enabled
    ? setYLabelsDimension({
        scale: yScale,
        axisTheme: theme.axisX,
        svgDimensions,
      })
    : null;

  const computeLayout = useCallback(() => {
    const sizeAxisX = calculateAxisDimension({
      svgElement: svgElement.current,
      axisTheme: theme.axisX,
      orientation: Orientation.HORIZONTAL,
      axisTitle: xTitle,
    });

    const sizeAxisY = calculateAxisDimension({
      svgElement: svgElement.current,
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
  }, [xTitle, yTitle, theme, initialMargins]);

  useEffect(() => {
    if (useDynamicLayout) {
      computeLayout();
    }
  }, [
    useDynamicLayout,
    xLabelsDimension,
    yLabelsDimension,
    layout,
    initialMargins,
    xTitle,
    yTitle,
    yScaleSettings.formatLabel,
    xScaleSettings.formatLabel,
  ]);

  const axisX = theme.axisX.enabled && {
    x: 0,
    y: svgDimensions.height - margins.bottom + theme.axisX.padding,
    scale: xScale,
    scaleSettings: xScaleSettings,
    orientation: Orientation.HORIZONTAL,
    axisTitle: xTitle,
    labelDimension: xLabelsDimension,
  };

  const axisY = theme.axisY.enabled && {
    x: margins.left - theme.axisY.padding,
    y: 0,
    scale: yScale,
    scaleSettings: yScaleSettings,
    orientation: Orientation.VERTICAL,
    axisTitle: yTitle,
    labelDimension: yLabelsDimension,
  };

  return (
    <>
      {axisX && <Ruler {...axisX} {...theme.axisX} />}
      {axisY && <Ruler {...axisY} {...theme.axisY} />}
    </>
  );
};

export default Axes;
