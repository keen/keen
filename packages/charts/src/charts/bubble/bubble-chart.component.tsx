import React, { FC, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip } from '@keen.io/ui-core';

import { ChartBase, Grid, Axes, AxisTitle } from '../../components';

import Bubbles from './bubbles.component';
import TooltipContent from './tooltip-content.component';
import { generateBubbles } from './utils/chart.utils';

import { useTooltip } from '../../hooks';
import { margins as defaultMargins, theme as defaultTheme } from '../../theme';

import {
  CommonChartSettings,
  ScaleSettings,
  AxisTitle as AxisTitleType,
} from '../../types';

const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

export type Props = {
  /** Chart data */
  data: object[];
  /** Name of data object property used to create labels */
  labelSelector: string;
  /** Key used to calculate the area dimension */
  valueKey: string;
  /** Key used to create domain for X scale */
  xDomainKey: string;
  /** Key used to create domain for Y scale */
  yDomainKey: string;
  /** X Scale settings */
  xScaleSettings?: ScaleSettings;
  /** Y Scale settings */
  yScaleSettings?: ScaleSettings;
  /** X axis title settings */
  xAxisTitle?: AxisTitleType;
  /** Y axis title settings */
  yAxisTitle?: AxisTitleType;
  /** Minimum area radius */
  minAreaRadius?: number;
  /** Maximum area radius */
  maxAreaRadius?: number;
} & CommonChartSettings;

export const BubbleChart: FC<Props> = ({
  data,
  svgDimensions,
  xDomainKey,
  yDomainKey,
  labelSelector,
  valueKey,
  theme = defaultTheme,
  margins = defaultMargins,
  maxAreaRadius = 40,
  minAreaRadius = 5,
  xScaleSettings = { type: 'linear' },
  yScaleSettings = { type: 'linear' },
  xAxisTitle,
  yAxisTitle,
}) => {
  const { bubbles, xScale, yScale, middlePoint } = generateBubbles({
    data,
    margins,
    maxAreaRadius,
    minAreaRadius,
    valueKey,
    dimension: svgDimensions,
    labelSelector,
    xDomainKey,
    yDomainKey,
    colors: theme.colors,
  });

  const svgElement = useRef(null);

  const {
    tooltipVisible,
    tooltipPosition,
    tooltipSelectors,
    updateTooltipPosition,
    hideTooltip,
  } = useTooltip(svgElement);

  const { tooltip: tooltipSettings, axisTitle: axisTitleSettings } = theme;

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
                  data={data}
                  labelSelector={labelSelector}
                  selectors={tooltipSelectors}
                  typography={tooltipSettings.labels.typography}
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
        margins={margins}
        xScaleSettings={xScaleSettings}
        yScaleSettings={yScaleSettings}
      >
        <Grid xScale={xScale} yScale={yScale} />
        {(xAxisTitle || yAxisTitle) && (
          <AxisTitle x={xAxisTitle} y={yAxisTitle} {...axisTitleSettings} />
        )}
        <Axes xScale={xScale} yScale={yScale} />
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
      </ChartBase>
    </>
  );
};

export default BubbleChart;
