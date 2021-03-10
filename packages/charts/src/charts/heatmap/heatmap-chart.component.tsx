import React, { FC, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Tooltip, ColorMode, RangeType, Text } from '@keen.io/ui-core';
import { useTooltip } from '@keen.io/react-hooks';
import {
  formatValue as valueFormatter,
  getFromPath,
  ScaleSettings,
  TooltipFormatter,
} from '@keen.io/charts-utils';

import Heatmap from './components/heatmap/heatmap.component';
import ShadowFilter from './components/shadow-filter.component';

import { ChartBase, Axes } from '../../components';
import { useDynamicChartLayout } from '../../hooks';

import { generateBlocks } from './utils/heatmap-chart.utils';

import { theme as defaultTheme } from '../../theme';
import { DEFAULT_MARGINS } from './constants';

import { CommonChartSettings } from '../../types';

const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

export type Props = {
  /** chart data */
  data: Record<string, any>[];
  /** Name of data object property used to create labels on axis */
  labelSelector: string;
  /** Minimum value for axis */
  minValue?: number | 'auto';
  /** Maximum value for axis */
  maxValue?: number | 'auto';
  /** Keys picked from data object used to generate blocks */
  keys?: string[];
  /** Automatically adjusts margins for visualization */
  useDynamicLayout?: boolean;
  /** Layout applied on chart blocks */
  layout?: Layout;
  /** Color mode */
  colorMode?: ColorMode;
  /** Amount of step for color calculation */
  steps?: number;
  /** X scale settings */
  xScaleSettings?: ScaleSettings;
  /** Y scale settings */
  yScaleSettings?: ScaleSettings;
  /** Title for X axis */
  xAxisTitle?: string;
  /** Title for Y axis */
  yAxisTitle?: string;
  /** Block padding */
  padding?: number;
  /** Range for filtering map values */
  range?: RangeType;
  /** Tooltip formatter */
  formatTooltip?: TooltipFormatter;
} & CommonChartSettings;

export const HeatmapChart: FC<Props> = ({
  data,
  svgDimensions,
  labelSelector,
  theme = defaultTheme,
  margins = DEFAULT_MARGINS,
  minValue = 'auto',
  maxValue = 'auto',
  keys = ['value'],
  layout = 'vertical',
  useDynamicLayout = true,
  colorMode = 'continuous',
  steps = 2,
  xScaleSettings = { type: 'band' },
  yScaleSettings = { type: 'band' },
  padding = 2,
  range,
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

  const {
    blocks,
    xScale,
    yScale,
    settings: { xAxisTitle: xTitle, yAxisTitle: yTitle },
  } = generateBlocks({
    data,
    margins: layoutMargins,
    dimension: svgDimensions,
    labelSelector,
    keys,
    minValue,
    maxValue,
    layout,
    colorMode,
    steps,
    range,
    xAxisTitle,
    yAxisTitle,
  });

  const svgElement = useRef<SVGSVGElement>(null);

  const {
    tooltipVisible,
    tooltipPosition,
    tooltipSelectors,
    updateTooltipPosition,
    hideTooltip,
  } = useTooltip(svgElement);

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
          >
            <Tooltip mode={tooltipSettings.mode} hasArrow={false}>
              {tooltipSelectors && (
                <Text {...tooltipSettings.labels.typography}>
                  {valueFormatter(
                    getFromPath(data, tooltipSelectors[0].selector),
                    formatTooltip
                  )}
                </Text>
              )}
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
      <ChartBase
        ref={svgElement}
        theme={theme}
        xScaleSettings={xScaleSettings}
        yScaleSettings={yScaleSettings}
        svgDimensions={svgDimensions}
        margins={layoutMargins}
      >
        <Axes
          svgElement={svgElement}
          layout={layout}
          useDynamicLayout={useDynamicLayout}
          initialMargins={margins}
          onComputeLayout={(margins) => {
            setLayoutMargins(margins);
            setLayoutReady(true);
          }}
          xScale={xScale}
          yScale={yScale}
          xTitle={xTitle}
          yTitle={yTitle}
        />
        {layoutReady && (
          <>
            <ShadowFilter />
            <Heatmap
              blocks={blocks}
              padding={padding}
              layout={layout}
              onMouseEnter={(e, selectors) => {
                if (tooltipSettings.enabled) {
                  updateTooltipPosition(e, [selectors]);
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

export default HeatmapChart;
