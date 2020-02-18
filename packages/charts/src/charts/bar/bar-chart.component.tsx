import React, { useState, useRef, FC } from 'react';
import { Layout } from '@keen.io/ui-core';

import { generateBars } from './bar-chart.utils';

import Bars from './bars.component';

import { ChartBase, ChartTooltip, Grid, Axes } from '../../components';

import { getFromPath } from '../../utils';
import { margins as defaultMargins, theme as defaultTheme } from '../../theme';

import { TOOLTIP_HIDE_TIME } from '../../constants';

import { CommonChartSettings, TooltipState, ScaleSettings } from '../../types';

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
  /** X Scale settings */
  xScaleSettings?: ScaleSettings;
  /** Group mode */
  groupMode?: 'grouped' | 'stacked';
  /** Stack mode */
  stackMode?: 'normal' | 'percent';
} & CommonChartSettings;

export const BarChart: FC<Props> = ({
  data,
  svgDimensions,
  labelSelector,
  theme = defaultTheme,
  margins = defaultMargins,
  layout = 'vertical',
  minValue = 'auto',
  maxValue = 'auto',
  keys = ['value'],
  stackMode = 'normal',
  groupMode = 'grouped',
  xScaleSettings = { type: 'band' },
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
    stackMode,
    groupMode,
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
    <>
      <ChartBase
        theme={theme}
        svgDimensions={svgDimensions}
        margins={margins}
        xScaleSettings={xScaleSettings}
      >
        <Grid xScale={xScale} yScale={yScale} />
        <Axes xScale={xScale} yScale={yScale} />
        <Bars
          bars={bars}
          layout={layout}
          onBarMouseEnter={(_e, _key, selector, { x, y }) => {
            if (clearTooltip.current) clearTimeout(clearTooltip.current);
            tooltipSettings.enabled &&
              setTooltip({ visible: true, x, y, selectors: [selector] });
          }}
          onBarMouseLeave={() => {
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
          {tooltip.selectors &&
            tooltip.selectors.map(({ selector, color }) => (
              <div key={color}>{getFromPath(data, selector)}</div>
            ))}
        </ChartTooltip>
      </ChartBase>
    </>
  );
};

export default BarChart;
