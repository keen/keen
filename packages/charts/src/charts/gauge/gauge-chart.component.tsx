import React, { FC, useEffect, useRef, useState } from 'react';
import { DefaultArcObject } from 'd3-shape';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip, Text, ColorMode } from '@keen.io/ui-core';

import ArcGradient, { GRADIENT_ID } from './arc-gradient.component';
import GaugeProgress from './gauge-progress.component';
import GaugeLabels from './gauge-labels.component';

import { generateGauge } from './utils';
import { createArcTween, animateArcPath, ArcProperties } from '../../utils';

import { ChartBase } from '../../components';
import { useTooltip } from '../../hooks';

import { theme as defaultTheme } from '../../theme';

import { ARC_MOTION_MS } from './constants';

import { CommonChartSettings } from '../../types';

export type Props = {
  /** Chart data */
  data: object[];
  /** Name of data object property used to create labels */
  labelSelector: string;
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
  minValue?: number | 'auto';
  /** Maximum progress value */
  maxValue?: number | 'auto';
  /** Progress type */
  progressType?: 'normal' | 'percent';
} & CommonChartSettings;

export const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

const progressValueMotion = {
  transition: { duration: 0.3, delay: 0.4 },
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
  margins = { top: 10, right: 0, bottom: 10, left: 0 },
  colorMode = 'continuous',
  colorSteps = 4,
  progressType = 'percent',
  minValue = 'auto',
  maxValue = 'auto',
}) => {
  const {
    maskPath,
    progressValue,
    outerArcPath,
    drawInnerArcPath,
    innerArcProperties,
    emptySpaceArcPath,
    innerArcColor,
    minimum,
    maximum,
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

  const [arcProperties, setArcProperties] = useState<ArcProperties>({
    startAngle: innerArcProperties.startAngle,
    endAngle: innerArcProperties.startAngle,
  });

  const svgElement = useRef(null);
  const pathElement = useRef(null);

  const {
    tooltipVisible,
    tooltipPosition,
    updateTooltipPosition,
    hideTooltip,
  } = useTooltip(svgElement);

  useEffect(() => {
    const motion = createArcTween(
      arcProperties,
      {
        startAngle: innerArcProperties.startAngle,
        endAngle: innerArcProperties.endAngle,
      },
      drawInnerArcPath
    );

    requestAnimationFrame(() => {
      animateArcPath(
        pathElement,
        motion,
        () => {
          setArcProperties({
            startAngle: innerArcProperties.startAngle,
            endAngle: innerArcProperties.endAngle,
          });
        },
        ARC_MOTION_MS
      );
    });
  }, []);

  const { gauge: gaugeSettings, tooltip: tooltipSettings } = theme;
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
              <AnimatePresence>
                <motion.g {...progressValueMotion}>
                  <GaugeProgress
                    progressType={progressType}
                    typography={gaugeSettings.total.typography}
                    maximum={maximum}
                    value={progressValue}
                  />
                </motion.g>
              </AnimatePresence>
            )}
          </g>
          <path
            ref={pathElement}
            d={drawInnerArcPath(arcProperties as DefaultArcObject)}
            fill={innerArcFill}
            onMouseMove={e => {
              if (tooltipSettings.enabled) {
                updateTooltipPosition(e);
              }
            }}
            onMouseLeave={() => hideTooltip()}
          />
          <path d={maskPath} fill="white" />
          {gaugeSettings.labels.enabled && (
            <GaugeLabels
              minValue={minimum}
              maxValue={maximum}
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
