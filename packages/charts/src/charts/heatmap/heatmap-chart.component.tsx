import React, { FC, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, ColorMode, RangeType } from '@keen.io/ui-core';

import { generateBlocks } from './heatmap-chart.utils';

import Heatmap from './heatmap.component';

import { Tooltip } from '@keen.io/ui-core';
import TooltipContent from './tooltip-content.component';
import { useTooltip } from '../../hooks';

import ShadowFilter from './shadow-filter.component';
import { ChartBase, Axes } from '../../components';
import { margins as defaultMargins, theme as defaultTheme } from '../../theme';

import { ScaleSettings, CommonChartSettings } from '../../types';

const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

export type Props = {
  /** chart data */
  data: object[];
  /** Name of data object property used to create labels on axis */
  labelSelector: string;
  /** Minimum value for axis */
  minValue?: number | 'auto';
  /** Maximum value for axis */
  maxValue?: number | 'auto';
  /** Keys picked from data object used to generate lines */
  keys?: string[];
  /** Layout applied on chart bars */
  layout?: Layout;
  /** Color mode */
  colorMode?: ColorMode;
  /** Amount of step for color calculation */
  steps?: number;
  /** X scale settings */
  xScaleSettings?: ScaleSettings;
  /** Y scale settings */
  yScaleSettings?: ScaleSettings;
  /** Block padding */
  padding?: number;
  /** Range for filtering map values */
  range?: RangeType;
} & CommonChartSettings;

export const HeatmapChart: FC<Props> = ({
  data,
  svgDimensions,
  labelSelector,
  theme = defaultTheme,
  margins = defaultMargins,
  minValue = 'auto',
  maxValue = 'auto',
  keys = ['value'],
  layout = 'vertical',
  colorMode = 'continuous',
  steps = 2,
  xScaleSettings = { type: 'band' },
  yScaleSettings = { type: 'band' },
  padding = 2,
  range,
}) => {
  const { blocks, xScale, yScale } = generateBlocks({
    data,
    margins,
    dimension: svgDimensions,
    labelSelector,
    keys,
    minValue,
    maxValue,
    layout,
    colorMode,
    steps,
    range,
  });

  const svgElement = useRef(null);

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
                <TooltipContent
                  typography={tooltipSettings.labels.typography}
                  data={data}
                  selectors={tooltipSelectors}
                />
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
        margins={margins}
      >
        <Axes xScale={xScale} yScale={yScale} />
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
      </ChartBase>
    </>
  );
};

export default HeatmapChart;
