import React, { FC, useRef } from 'react';
import { ColorMode } from '@keen.io/ui-core';

import ArcGradient, { GRADIENT_ID } from './arc-gradient.component';
import { generateGauge } from './utils';

import { ChartBase } from '../../components';

import { theme as defaultTheme } from '../../theme';

import { CommonChartSettings } from '../../types';

export type Props = {
  /** Chart data */
  data: object[];
  /** Name of data object property used to create series */
  labelSelector?: string;
  /** Keys picked from data object used to genrate slices */
  keys?: string[];
  /** Key used to calculate the gauge progress */
  valueKey: string;
  /** Arc start angle */
  startAngle?: number;
  /** Arc end angle */
  endAngle?: number;
  /** Color scale mode */
  colorMode?: ColorMode;
  /** Amount of step used in color scale */
  colorSteps?: number;
  /** Maximum progress value */
  maxValue?: number;
} & CommonChartSettings;

export const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

export const GaugeChart: FC<Props> = ({
  data,
  valueKey,
  svgDimensions,
  theme = defaultTheme,
  startAngle = -120,
  endAngle = 120,
  margins = { top: 10, right: 10, bottom: 10, left: 10 },
  colorMode = 'continuous',
  colorSteps = 5,
  maxValue = 1000,
}) => {
  const {
    maskPath,
    outerArcPath,
    innerArcPath,
    getColor,
    innerArcColor,
  } = generateGauge({
    data,
    dimension: svgDimensions,
    valueKey,
    margins,
    maxValue,
    startAngle,
    endAngle,
    colorSteps,
    colorMode,
    colors: theme.colors,
  });

  const svgElement = useRef(null);
  const innerArcFill =
    colorMode === 'continuous' ? `url(#${GRADIENT_ID})` : innerArcColor;

  return (
    <>
      <ChartBase
        ref={svgElement}
        theme={theme}
        svgDimensions={svgDimensions}
        margins={margins}
      >
        <g
          style={{
            transform: `translate(${svgDimensions.width /
              2}px, ${svgDimensions.height / 2}px)`,
          }}
        >
          {colorMode === 'continuous' && (
            <ArcGradient steps={colorSteps} colors={theme.colors} />
          )}
          <path d={outerArcPath} fill={getColor(maxValue)} />
          <path d={innerArcPath} fill={innerArcFill} />
          <path d={maskPath} fill="white" />
        </g>
      </ChartBase>
    </>
  );
};

export default GaugeChart;
