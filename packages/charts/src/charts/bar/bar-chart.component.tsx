import React, { useState, useRef, FC } from 'react';
import { Layout } from '@keen.io/ui-core';

import { generateBars } from './bar-chart.utils';

import Bars from './bars.component';
import BarTooltip from './bar-tooltip.component';

import { ChartBase, Grid, Axes } from '../../components';

import { getFromPath } from '../../utils';
import { margins as defaultMargins, theme as defaultTheme } from '../../theme';

import { TOOLTIP_HIDE_TIME } from '../../constants';

import { CommonChartSettings, TooltipState } from '../../types';

export type Props = {
  /** Chart data */
  data: object[];
  /** Name of data object property used to create labels on axis */
  labelSelector: string;
  /** Minimum value for axis */
  minValue?: number | 'auto';
  /** Maximum value for axis */
  maxValue?: number | 'auto';
  /** Padding between bar groups */
  barPadding?: number;
  /** Keys picked from data object used to genrate bars */
  keys?: string[];
  /** Layout applied on chart bars */
  layout?: Layout;
  /** Function for label format */
  formatLabel?: (label: string | number) => string | number;
} & CommonChartSettings;

export const BarChart: FC<Props> = ({
  data,
  svgDimensions,
  labelSelector,
  formatLabel,
  theme = defaultTheme,
  margins = defaultMargins,
  layout = 'vertical',
  minValue = 'auto',
  maxValue = 'auto',
  keys = ['value'],
  barPadding = 0.1,
}) => {
  const { bars, xScale, yScale } = generateBars({
    data,
    margins,
    dimension: svgDimensions,
    labelSelector,
    barPadding,
    layout,
    keys,
    minValue,
    maxValue,
    colors: theme.colors,
  });

  const { tooltip: tooltipSettings } = theme;

  const clearTooltip = useRef(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    key: null,
    visible: false,
    x: 0,
    y: 0,
  });

  return (
    <>
      <ChartBase theme={theme} svgDimensions={svgDimensions} margins={margins}>
        <Grid xScale={xScale} yScale={yScale} />
        <Axes xScale={xScale} yScale={yScale} formatLabel={formatLabel} />
        <Bars
          bars={bars}
          layout={layout}
          onBarMouseEnter={(_e, key, { x, y }) => {
            if (clearTooltip.current) clearTimeout(clearTooltip.current);
            tooltipSettings.enabled && setTooltip({ visible: true, x, y, key });
          }}
          onBarMouseLeave={() => {
            if (tooltipSettings.enabled) {
              clearTooltip.current = setTimeout(() => {
                setTooltip(prevState => ({
                  ...prevState,
                  visible: false,
                  x: 0,
                  y: 0,
                }));
              }, TOOLTIP_HIDE_TIME);
            }
          }}
        />
        <BarTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y}>
          {tooltip.key && getFromPath(data, tooltip.key)}
        </BarTooltip>
      </ChartBase>
    </>
  );
};

export default BarChart;
