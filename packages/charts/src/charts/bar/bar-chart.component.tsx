import React, { useState, useRef, FC } from 'react';
import { Layout } from '@keen.io/ui-core';

import { generateBars } from './utils/chart.utils';
import { getSelectors } from './utils/tooltip.utils';

import Bars from './bars.component';
import BarTooltipContent from './bar-tooltip-content.component';

import { ChartBase, ChartTooltip, Grid, Axes } from '../../components';

import { margins as defaultMargins, theme as defaultTheme } from '../../theme';

import { TOOLTIP_HIDE_TIME } from '../../constants';

import { GroupMode, StackMode } from './types';
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
  /** Keys that are disabled for rendering data series */
  disabledKeys?: string[];
  /** Layout applied on chart bars */
  layout?: Layout;
  /** X Scale settings */
  xScaleSettings?: ScaleSettings;
  /** Y Scale settings */
  yScaleSettings?: ScaleSettings;
  /** Group mode */
  groupMode?: GroupMode;
  /** Stack mode */
  stackMode?: StackMode;
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
  disabledKeys = [],
  stackMode = 'normal',
  groupMode = 'grouped',
  xScaleSettings = { type: 'band' },
  yScaleSettings = { type: 'linear' },
  barPadding = 0.1,
}) => {
  const { bars, xScale, yScale, scaleSettings } = generateBars({
    data,
    margins,
    dimension: svgDimensions,
    labelSelector,
    barPadding,
    layout,
    keys,
    disabledKeys,
    minValue,
    maxValue,
    colors: theme.colors,
    stackMode,
    groupMode,
    xScaleSettings,
    yScaleSettings,
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
        {...scaleSettings}
      >
        <Grid xScale={xScale} yScale={yScale} />
        <Axes xScale={xScale} yScale={yScale} />
        <Bars
          bars={bars}
          stackMode={stackMode}
          groupMode={groupMode}
          layout={layout}
          onBarMouseEnter={(_e, _key, selector, { x, y }) => {
            if (clearTooltip.current) clearTimeout(clearTooltip.current);
            if (tooltipSettings.enabled) {
              const selectors = getSelectors({
                stackMode,
                groupMode,
                keys,
                disabledKeys,
                colors: theme.colors,
                selector,
              });
              setTooltip({ visible: true, x, y, selectors });
            }
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
          {tooltip.selectors && (
            <BarTooltipContent
              data={data}
              stackMode={stackMode}
              groupMode={groupMode}
              selectors={tooltip.selectors}
              isList={tooltip.selectors.length > 1}
            />
          )}
        </ChartTooltip>
      </ChartBase>
    </>
  );
};

export default BarChart;
