import React, { FC, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@keen.io/ui-core';

import { generateBlocks } from './heatmap-chart.utils';

import Heatmap from './heatmap.component';
// import Tooltip from './tooltip.component';

import { Tooltip } from '@keen.io/ui-core';
import TooltipContent from './tooltip-content.component';
import { useTooltip } from '../../hooks';

import ShadowFilter from './shadow-filter.component';
import { ChartBase, /*ChartTooltip,*/ Axes } from '../../components';
import { margins as defaultMargins, theme as defaultTheme } from '../../theme';

import { ScaleSettings, CommonChartSettings } from '../../types';

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
  /** Keys that are disabled for rendering data series */
  disabledKeys?: string[];
  /** Layout applied on chart bars */
  layout?: Layout;
  /** X scale settings */
  xScaleSettings?: ScaleSettings;
  /** Y scale settings */
  yScaleSettings?: ScaleSettings;
  /** Block padding */
  padding?: number;
} & CommonChartSettings;

export const LineChart: FC<Props> = ({
  data,
  svgDimensions,
  labelSelector,
  theme = defaultTheme,
  margins = defaultMargins,
  minValue = 'auto',
  maxValue = 'auto',
  keys = ['value'],
  disabledKeys = [],
  layout = 'vertical',
  xScaleSettings = { type: 'band' },
  yScaleSettings = { type: 'band' },
  padding = 2,
}) => {
  const { blocks, xScale, yScale, select } = generateBlocks({
    data,
    margins,
    dimension: svgDimensions,
    labelSelector,
    keys,
    disabledKeys,
    minValue,
    maxValue,
    layout,
  });

  const svgElement = useRef(null);

  const {
    tooltipVisible,
    tooltipPosition,
    tooltipSelectors,
    updateTooltipPosition,
    hideTooltip,
  } = useTooltip(svgElement, 0);

  const { tooltip: tooltipSettings } = theme;

  const tooltipMotion = {
    transition: { duration: 0.3 },
    exit: { opacity: 0 },
  };

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
            <Tooltip hasArrow={false}>
              {tooltipSelectors && (
                <TooltipContent data={data} selectors={tooltipSelectors} />
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
          select={select}
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

export default LineChart;
