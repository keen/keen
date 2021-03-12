import React, { FC, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip } from '@keen.io/ui-core';
import { FormatFunction, ScaleSettings } from '@keen.io/charts-utils';
import { useTooltip } from '@keen.io/react-hooks';

import { ChartBase, Grid, Axes } from '../../components';

import Bubbles from './bubbles.component';
import TooltipContent from './tooltip-content.component';

import { generateBubbles } from './utils/chart.utils';
import { useDynamicChartLayout } from '../../hooks';

import { theme as defaultTheme } from '../../theme';
import { DEFAULT_MARGINS } from './constants';

import { CommonChartSettings } from '../../types';

const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

export type Props = {
  /** Chart data */
  data: Record<string, any>[];
  /** Name of data object property used to create labels */
  labelSelector: string;
  /** Key used to calculate the area dimension */
  valueKey: string;
  /** Key used to create domain for X scale */
  xDomainKey: string;
  /** Key used to create domain for Y scale */
  yDomainKey: string;
  /** Keys that are disabled for rendering data series */
  disabledKeys?: string[];
  /** X Scale settings */
  xScaleSettings?: ScaleSettings;
  /** Y Scale settings */
  yScaleSettings?: ScaleSettings;
  /** Title for X axis */
  xAxisTitle?: string;
  /** Title for Y axis */
  yAxisTitle?: string;
  /** Minimum area radius */
  minAreaRadius?: number;
  /** Maximum area radius */
  maxAreaRadius?: number;
  /** Automatically adjusts margins for visualization */
  useDynamicLayout?: boolean;
  /** Tooltip formatter */
  formatTooltip?: {
    xKey?: FormatFunction;
    yKey?: FormatFunction;
    valueKey?: FormatFunction;
  };
} & CommonChartSettings;

export const BubbleChart: FC<Props> = ({
  data,
  svgDimensions,
  useDynamicLayout = true,
  xDomainKey,
  yDomainKey,
  labelSelector,
  disabledKeys = [],
  valueKey,
  theme = defaultTheme,
  margins = DEFAULT_MARGINS,
  maxAreaRadius = 40,
  minAreaRadius = 5,
  xScaleSettings = { type: 'linear' },
  yScaleSettings = { type: 'linear' },
  xAxisTitle,
  yAxisTitle,
  formatTooltip,
}) => {
  const {
    layoutMargins,
    layoutReady,
    setLayoutReady,
    setLayoutMargins,
  } = useDynamicChartLayout(useDynamicLayout, margins);

  const { bubbles, xScale, yScale, middlePoint } = generateBubbles({
    data,
    margins: layoutMargins,
    maxAreaRadius,
    minAreaRadius,
    valueKey,
    dimension: svgDimensions,
    labelSelector,
    disabledKeys,
    xDomainKey,
    yDomainKey,
    colors: theme.colors,
  });

  const svgElement = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const {
    tooltipVisible,
    tooltipPosition,
    tooltipSelectors,
    updateTooltipPosition,
    hideTooltip,
  } = useTooltip(svgElement, false, false, tooltipRef);

  const { tooltip: tooltipSettings } = theme;

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
            ref={tooltipRef}
          >
            <Tooltip mode={tooltipSettings.mode} hasArrow={false}>
              {tooltipSelectors && (
                <TooltipContent
                  data={data}
                  labelSelector={labelSelector}
                  selectors={tooltipSelectors}
                  typography={tooltipSettings.labels.typography}
                  valueKey={valueKey}
                  xDomainKey={xDomainKey}
                  yDomainKey={yDomainKey}
                  formatValue={formatTooltip}
                />
              )}
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
      <ChartBase
        ref={svgElement}
        theme={theme}
        svgDimensions={svgDimensions}
        margins={layoutMargins}
        xScaleSettings={xScaleSettings}
        yScaleSettings={yScaleSettings}
      >
        <Axes
          svgElement={svgElement}
          useDynamicLayout={useDynamicLayout}
          initialMargins={margins}
          onComputeLayout={(margins) => {
            setLayoutMargins(margins);
            setLayoutReady(true);
          }}
          xScale={xScale}
          yScale={yScale}
          xTitle={xAxisTitle}
          yTitle={yAxisTitle}
        />
        {layoutReady && (
          <>
            <Grid xScale={xScale} yScale={yScale} />
            <Bubbles
              bubbles={bubbles}
              middlePoint={middlePoint}
              onMouseEnter={(e, selectors) => {
                if (tooltipSettings.enabled) {
                  updateTooltipPosition(e, selectors);
                }
              }}
              onMouseLeave={() => {
                hideTooltip();
              }}
            />
          </>
        )}
      </ChartBase>
    </>
  );
};

export default BubbleChart;
