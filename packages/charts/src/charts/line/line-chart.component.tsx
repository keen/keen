import React, { FC, useRef } from 'react';

import { generateLines } from './line-chart.utils';

import Lines from './lines.component';
import Tooltip from './tooltip.component';

import { useTooltip } from '../../hooks';

import { ChartBase, ChartTooltip, Axes, Grid } from '../../components';
import { margins as defaultMargins, theme as defaultTheme } from '../../theme';

import {
  ScaleSettings,
  CommonChartSettings,
  GroupMode,
  StackMode,
} from '../../types';

import { CurveType } from './types';

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
  /** Marks radius */
  markRadius?: number;
  /** Line thickness */
  strokeWidth?: number | 2;
  /** X scale settings */
  xScaleSettings?: ScaleSettings;
  /** Y scale settings */
  yScaleSettings?: ScaleSettings;
  /** Curve type */
  curve?: CurveType;
  /** Group mode */
  groupMode?: GroupMode;
  /** Stack mode */
  stackMode?: StackMode;
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
  markRadius = 4,
  strokeWidth = 1,
  curve = 'linear',
  stackMode = 'normal',
  groupMode = 'grouped',
  xScaleSettings = { precision: 'month', type: 'time' },
  yScaleSettings = { type: 'linear' },
}) => {
  const { lines, marks, xScale, yScale, steps, stepMode } = generateLines({
    data,
    margins,
    dimension: svgDimensions,
    labelSelector,
    keys,
    disabledKeys,
    minValue,
    maxValue,
    colors: theme.colors,
    markRadius,
    strokeWidth,
    curve,
    stackMode,
    groupMode,
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

  return (
    <ChartBase
      ref={svgElement}
      theme={theme}
      xScaleSettings={xScaleSettings}
      yScaleSettings={yScaleSettings}
      svgDimensions={svgDimensions}
      margins={margins}
    >
      <Grid xScale={xScale} yScale={yScale} />
      <Axes xScale={xScale} yScale={yScale} />
      <Lines
        lines={lines}
        marks={marks}
        steps={steps}
        curve={curve}
        groupMode={groupMode}
        stackMode={stackMode}
        stepMode={stepMode}
        onMarkMouseEnter={(e, selectors) => {
          if (tooltipSettings.enabled) {
            updateTooltipPosition(e, selectors);
          }
        }}
        onMarkMouseLeave={() => {
          hideTooltip();
        }}
      />
      <ChartTooltip
        visible={tooltipVisible}
        x={tooltipPosition.x}
        y={tooltipPosition.y}
      >
        {tooltipSelectors && (
          <Tooltip data={data} selectors={tooltipSelectors} />
        )}
      </ChartTooltip>
    </ChartBase>
  );
};

export default LineChart;
