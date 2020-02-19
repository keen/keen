import React, { FC, useState, useRef } from 'react';

import { generateLines } from './line-chart.utils';

import Lines from './lines.component';
import Tooltip from './tooltip.component';

import { ChartBase, ChartTooltip, Axes, Grid } from '../../components';
import { margins as defaultMargins, theme as defaultTheme } from '../../theme';

import { ScaleSettings, TooltipState, CommonChartSettings } from '../../types';

import { TOOLTIP_HIDE_TIME } from '../../constants';

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
  /** Marks radius */
  markRadius?: number;
  /** Line thickness */
  strokeWidth?: number | 2;
  /** X scale settings */
  xScaleSettings?: ScaleSettings;
  /** Y scale settings */
  yScaleSettings?: ScaleSettings;
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
  markRadius = 4,
  strokeWidth = 1,
  xScaleSettings = { precision: 'month', type: 'time' },
  yScaleSettings = { type: 'linear' },
}) => {
  const { lines, marks, xScale, yScale } = generateLines({
    data,
    margins,
    dimension: svgDimensions,
    labelSelector,
    keys,
    minValue,
    maxValue,
    colors: theme.colors,
    markRadius,
    strokeWidth,
  });

  const { tooltip: tooltipSettings } = theme;

  const clearTooltip = useRef(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    selectors: null,
    visible: false,
    x: 0,
    y: 0,
  });

  return (
    <ChartBase
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
        onMarkMouseEnter={(_e, { x, y }, selectors) => {
          if (clearTooltip.current) clearTimeout(clearTooltip.current);
          tooltipSettings.enabled &&
            setTooltip({ visible: true, x, y, selectors });
        }}
        onMarkMouseLeave={() => {
          if (tooltipSettings.enabled) {
            clearTooltip.current = setTimeout(() => {
              setTooltip({
                selectors: null,
                visible: false,
                x: 0,
                y: 0,
              });
            }, TOOLTIP_HIDE_TIME);
          }
        }}
      />
      <ChartTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y}>
        {tooltip.selectors && (
          <Tooltip data={data} selectors={tooltip.selectors} />
        )}
      </ChartTooltip>
    </ChartBase>
  );
};

export default LineChart;
