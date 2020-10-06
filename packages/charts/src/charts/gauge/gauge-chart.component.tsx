import React, { FC, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip, Text, ColorMode } from '@keen.io/ui-core';
import { useTooltip } from '@keen.io/react-hooks';

import GaugeProgress from './gauge-progress.component';
import GaugeLabels from './gauge-labels.component';

import { generateGauge } from './utils';

import { ChartBase } from '../../components';

import { theme as defaultTheme } from '../../theme';
import { TOOLTIP_TIMEOUT } from './constants';

import { CommonChartSettings } from '../../types';

import { TOOLTIP_MOTION } from '../../constants';

export type Props = {
  /** Chart data */
  data: Record<string, any>[];
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
  /** Value format function */
  formatValue?: (value: string | number) => React.ReactNode;
  /** Progress type */
  progressType?: 'normal' | 'percent';
} & CommonChartSettings;

const createArcMotion = (index: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 0.5 },
  exit: {},
  transition: { delay: 0.005 * index, duration: 0 },
});

const progressValueMotion = {
  transition: { duration: 0.3 },
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
  colorSteps = 2,
  progressType = 'percent',
  minValue = 'auto',
  maxValue = 'auto',
  formatValue,
}) => {
  const {
    progressValue,
    outerArcPath,
    emptySpaceArcPath,
    minimum,
    maximum,
    innerArcs,
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

  const svgElement = useRef<SVGSVGElement>(null);
  const tooltipTimeout = useRef(null);

  const {
    tooltipVisible,
    tooltipPosition,
    tooltipMeta,
    updateTooltipPosition,
    hideTooltip,
  } = useTooltip(svgElement);

  const { gauge: gaugeSettings, tooltip: tooltipSettings } = theme;

  return (
    <>
      <AnimatePresence>
        {tooltipVisible && (
          <motion.div
            {...TOOLTIP_MOTION}
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
                {tooltipMeta.value}
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
                    formatValue={formatValue}
                    typography={gaugeSettings.total.typography}
                    minimum={minimum}
                    maximum={maximum}
                    value={progressValue}
                  />
                </motion.g>
              </AnimatePresence>
            )}
          </g>
          <AnimatePresence>
            {innerArcs.map(({ path, value, color }, idx) => (
              <motion.path
                key={idx}
                d={path}
                fill={color}
                {...createArcMotion(idx)}
                onMouseLeave={() => {
                  tooltipTimeout.current = setTimeout(() => {
                    hideTooltip();
                  }, TOOLTIP_TIMEOUT);
                }}
                onMouseEnter={e => {
                  if (tooltipSettings.enabled) {
                    if (tooltipTimeout.current)
                      clearTimeout(tooltipTimeout.current);
                    updateTooltipPosition(e, null, { value });
                  }
                }}
              />
            ))}
          </AnimatePresence>
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
