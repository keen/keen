import React, { FC, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, BulletList } from '@keen.io/ui-core';

import { generateCircularChart, LabelsPosition } from '../../utils';
import { getTooltipContent } from '../../utils/tooltip.utils';

import DonutSlice from './donut-slice.component';
import ShadowFilter from '../../components/shadow-filter.component';

import { ChartBase } from '../../components';
import DonutTotal from './donut-total.component';

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
  /** Spacing between donut slices */
  padAngle?: number;
  /** Radius between donut slices */
  padRadius?: number;
  /** Arc corner radius */
  cornerRadius?: number;
  /** Radius of inner circle - relative to outer radius [0, 1] */
  innerRadius?: number;
  /** The radius for slice labels */
  labelsRadius?: number;
  /** Show labels inside or outside donut slices */
  labelsPosition?: LabelsPosition;
  /** Automatically adjust labels color */
  labelsAutocolor?: boolean;
  /** Stack the arcs if percent value is lower than provided treshold */
  stackTreshold?: number;
} & CommonChartSettings;

export const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

export const DonutChart: FC<Props> = ({
  data,
  svgDimensions,
  theme = defaultTheme,
  margins = { top: 30, right: 20, bottom: 30, left: 40 },
  labelSelector = 'name',
  keys = ['value'],
  disabledLabels = [],
  padAngle = 0.02,
  padRadius = 100,
  cornerRadius = 2,
  innerRadius = 0.5,
  labelsRadius = 30,
  labelsPosition = 'inside',
  labelsAutocolor = true,
  stackTreshold = 4,
}) => {
  const { total: totalValue, arcs, drawArc } = generateCircularChart({
    data,
    margins,
    padAngle,
    padRadius,
    cornerRadius,
    innerRadius,
    labelSelector,
    labelsRadius,
    keys,
    disabledLabels,
    labelsPosition,
    dimension: svgDimensions,
    colors: theme.colors,
    type: 'donut',
    stackTreshold,
  });

  console.log(arcs, 'laalal');

  const svgElement = useRef(null);

  const {
    tooltipVisible,
    tooltipPosition,
    tooltipSelectors,
    updateTooltipPosition,
    hideTooltip,
  } = useTooltip(svgElement);

  const { tooltip: tooltipSettings, donut: donutSettings } = theme;
  const {
    enabled: totalEnabled,
    label: donutTotalLabel,
    value: donutTotalValue,
  } = donutSettings.total;
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
                <BulletList
                  list={getTooltipContent({
                    data,
                    keys,
                    labelSelector,
                    selectors: tooltipSelectors,
                  })}
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
              activePosition,
              startAngle,
              endAngle,
              color,
              selector,
              stacked,
              stack,
            }) => (
              <DonutSlice
                key={index}
                draw={drawArc}
                startAngle={startAngle}
                endAngle={endAngle}
                label={label}
                autocolor={labelsAutocolor}
                activePosition={activePosition}
                labelPosition={labelPosition}
                background={color}
                onMouseMove={e => {
                  if (tooltipSettings.enabled) {
                    if (stacked) updateTooltipPosition(e, stack);
                    else updateTooltipPosition(e, [{ color, selector }]);
                  }
                }}
                onMouseLeave={() => hideTooltip()}
              />
            )
          )}
          {totalEnabled && (
            <DonutTotal
              total={{
                label: donutTotalLabel.typography,
                value: donutTotalValue.typography,
              }}
            >
              {totalValue}
            </DonutTotal>
          )}
        </g>
      </ChartBase>
    </>
  );
};

export default DonutChart;
