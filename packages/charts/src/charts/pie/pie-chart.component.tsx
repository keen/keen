import React, { FC, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from '@keen.io/ui-core';

import { generatePieChart, LabelsPosition } from './utils';

import PieSlice from './pie-slice.component';
import TooltipContent from './tooltip-content.component';
import ShadowFilter from './shadow-filter.component';

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
  /** Labels that are disabled for rendering data series */
  disabledLabels?: string[];
  /** Spacing between pie slices */
  padAngle?: number;
  /** Radius of inner circle */
  innerRadius?: number;
  /** The radius for slice labels */
  labelsRadius?: number;
  /** Show labels inside our outside pie slices */
  labelsPosition?: LabelsPosition;
  /** Automatically adjust labels color */
  labelsAutocolor?: boolean;
} & CommonChartSettings;

export const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

export const PieChart: FC<Props> = ({
  data,
  svgDimensions,
  theme = defaultTheme,
  margins = { top: 30, right: 20, bottom: 30, left: 40 },
  labelSelector = 'name',
  keys = ['value'],
  disabledLabels = [],
  padAngle = 0.01,
  innerRadius = 20,
  labelsRadius = 30,
  labelsPosition = 'inside',
  labelsAutocolor = true,
}) => {
  const { arcs, drawArc, drawActiveArc } = generatePieChart({
    data,
    margins,
    padAngle,
    innerRadius,
    labelSelector,
    labelsRadius,
    keys,
    disabledLabels,
    labelsPosition,
    dimension: svgDimensions,
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
            <Tooltip hasArrow={false}>
              {tooltipSelectors && (
                <TooltipContent
                  data={data}
                  selectors={tooltipSelectors}
                  keys={keys}
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
      >
        <g
          style={{
            transform: `translate(${svgDimensions.width /
              2}px, ${svgDimensions.height / 2}px)`,
          }}
        >
          <ShadowFilter />
          {arcs.map(
            ({
              index,
              label,
              labelPosition,
              startAngle,
              endAngle,
              color,
              selector,
            }) => (
              <PieSlice
                key={index}
                draw={drawArc}
                drawActive={drawActiveArc}
                startAngle={startAngle}
                endAngle={endAngle}
                label={label}
                autocolor={labelsAutocolor}
                labelPosition={labelPosition}
                background={color}
                onMouseMove={e => {
                  if (tooltipSettings.enabled) {
                    updateTooltipPosition(e, [{ color, selector }]);
                  }
                }}
                onMouseLeave={() => hideTooltip()}
              />
            )
          )}
        </g>
      </ChartBase>
    </>
  );
};

export default PieChart;
