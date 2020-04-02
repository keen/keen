import React, { FC, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip, Text, ColorMode } from '@keen.io/ui-core';

import ArcGradient, { GRADIENT_ID } from './arc-gradient.component';
import GaugeLabels from './gauge-labels.component';

import { generateGauge } from './utils';
import { formatNumber } from '../../utils/format.utils';

import { ChartBase } from '../../components';
import { useTooltip } from '../../hooks';

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
  /** Minimum progress value */
  minValue?: number;
  /** Maximum progress value */
  maxValue?: number;
  /** Progress type */
  type?: 'normal' | 'percent';
} & CommonChartSettings;

export const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

const progressMotion = {
  transition: { duration: 0.3, delay: 0.3 },
  initial: { opacity: 0 },
  animate: { opacity: 1 },
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
  colorSteps = 4,
  type = 'percent',
  minValue = 0,
  maxValue = 100,
}) => {
  const {
    maskPath,
    progressValue,
    outerArcPath,
    innerArcPath,
    emptySpaceArcPath,
    innerArcColor,
  } = generateGauge({
    data,
    dimension: svgDimensions,
    valueKey,
    margins,
    minValue,
    maxValue,
    startAngle,
    endAngle,
    colorSteps,
    colorMode,
    colors: theme.colors,
  });

  const svgElement = useRef(null);
  const {
    tooltipVisible,
    tooltipPosition,
    updateTooltipPosition,
    hideTooltip,
  } = useTooltip(svgElement);

  const { gauge: gaugeSettings, tooltip: tooltipSettings } = theme;
  const { fontColor, ...valueStyles } = gaugeSettings.total.typography;

  const innerArcFill =
    colorMode === 'continuous' ? `url(#${GRADIENT_ID})` : innerArcColor;

  return (
    <>
      <AnimatePresence>
        {tooltipVisible && (
          <motion.div
            {...tooltipMotion}
            initial={{ opacity: 0, x: tooltipPosition.x, y: tooltipPosition.y }}
            animate={{
              x: tooltipPosition.x,
              y: tooltipPosition.y,
              opacity: 1,
            }}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
            }}
          >
            <Tooltip mode={tooltipSettings.mode} hasArrow={false}>
              <Text {...tooltipSettings.labels.typography}>
                {progressValue}
              </Text>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
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
          <g
            style={{
              textAnchor: 'middle',
              dominantBaseline: 'central',
            }}
          >
            <path
              d={outerArcPath}
              fill={gaugeSettings.border.backgroundColor}
            />
            {gaugeSettings.total.enabled && (
              <text fill={fontColor} textAnchor="middle" style={valueStyles}>
                {type === 'percent' ? (
                  <>
                    {formatNumber((progressValue / maxValue) * 100)}
                    <tspan
                      style={{
                        fontSize: valueStyles.fontSize / 2,
                      }}
                    >
                      %
                    </tspan>
                  </>
                ) : (
                  progressValue
                )}
              </text>
            )}
          </g>
          <AnimatePresence>
            <motion.path
              d={innerArcPath}
              fill={innerArcFill}
              onMouseMove={e => {
                if (tooltipSettings.enabled) {
                  updateTooltipPosition(e);
                }
              }}
              onMouseLeave={() => hideTooltip()}
              {...progressMotion}
            />
          </AnimatePresence>
          <path d={maskPath} fill="white" />
          {gaugeSettings.labels.enabled && (
            <GaugeLabels
              minValue={minValue}
              maxValue={maxValue}
              typography={gaugeSettings.labels.typography}
              arcPath={emptySpaceArcPath}
            />
          )}
        </g>
      </ChartBase>
    </>
  );
};

export default GaugeChart;
