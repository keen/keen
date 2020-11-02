import React, { useState, useRef, FC } from 'react';
import { Layout, SortMode } from '@keen.io/ui-core';
import { ScaleSettings } from '@keen.io/charts-utils';

import { generateBars } from './utils/chart.utils';
import { getSelectors } from './utils/tooltip.utils';

import Bars from './bars.component';
import BarTooltipContent from './bar-tooltip-content.component';

import { ChartBase, ChartTooltip, Grid, Axes } from '../../components';
import { useDynamicChartLayout } from '../../hooks';

import { theme as defaultTheme } from '../../theme';

import { DEFAULT_MARGINS } from './constants';
import { TOOLTIP_HIDE_TIME } from '../../constants';

import {
  CommonChartSettings,
  TooltipState,
  GroupMode,
  StackMode,
} from '../../types';

export type Props = {
  /** Chart data */
  data: Record<string, any>[];
  /** Name of data object property used to create labels on axis */
  labelSelector: string;
  /** Minimum value for axis */
  minValue?: number | 'auto';
  /** Maximum value for axis */
  maxValue?: number | 'auto';
  /** Padding between bar groups */
  barPadding?: number;
  /** Show values on bars */
  showValues?: boolean;
  /** Automatically adjust values color */
  valuesAutocolor?: boolean;
  /** Keys picked from data object used to genrate bars */
  keys?: string[];
  /** Keys that are disabled for rendering data series */
  disabledKeys?: string[];
  /** Layout applied on chart bars */
  layout?: Layout;
  /** Automatically adjusts margins for visualization */
  useDynamicLayout?: boolean;
  /** X Scale settings */
  xScaleSettings?: ScaleSettings;
  /** Y Scale settings */
  yScaleSettings?: ScaleSettings;
  /** Title for X axis */
  xAxisTitle?: string;
  /** Title for Y axis */
  yAxisTitle?: string;
  /** Group mode */
  groupMode?: GroupMode;
  /** Stack mode */
  stackMode?: StackMode;
  /** Type of ordering applied on bars */
  barsOrder?: SortMode;
} & CommonChartSettings;

export const BarChart: FC<Props> = ({
  data,
  svgDimensions,
  labelSelector,
  theme = defaultTheme,
  margins = DEFAULT_MARGINS,
  layout = 'vertical',
  useDynamicLayout = true,
  minValue = 'auto',
  maxValue = 'auto',
  keys = ['value'],
  disabledKeys = [],
  stackMode = 'normal',
  groupMode = 'grouped',
  xScaleSettings = { type: 'band' },
  yScaleSettings = { type: 'linear' },
  barPadding = 0.1,
  showValues = false,
  valuesAutocolor = true,
  barsOrder,
  xAxisTitle,
  yAxisTitle,
}) => {
  const {
    layoutMargins,
    layoutReady,
    setLayoutReady,
    setLayoutMargins,
  } = useDynamicChartLayout(useDynamicLayout, margins);

  const {
    bars,
    xScale,
    yScale,
    settings,
    settings: { xAxisTitle: xTitle, yAxisTitle: yTitle },
  } = generateBars({
    data,
    margins: layoutMargins,
    dimension: svgDimensions,
    labelSelector,
    barPadding,
    barsOrder,
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
    xAxisTitle,
    yAxisTitle,
  });

  const { tooltip: tooltipSettings } = theme;

  const clearTooltip = useRef(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    selectors: null,
    visible: false,
    x: 0,
    y: 0,
  });

  console.log(barsOrder, 'sa');

  return (
    <>
      <ChartBase
        theme={theme}
        svgDimensions={svgDimensions}
        margins={layoutMargins}
        {...settings}
      >
        <Axes
          layout={layout}
          useDynamicLayout={useDynamicLayout}
          initialMargins={margins}
          onComputeLayout={margins => {
            setLayoutMargins(margins);
            setLayoutReady(true);
          }}
          xScale={xScale}
          yScale={yScale}
          xTitle={xTitle}
          yTitle={yTitle}
        />
        {layoutReady && (
          <>
            <Grid xScale={xScale} yScale={yScale} />
            <Bars
              bars={bars}
              stackMode={stackMode}
              groupMode={groupMode}
              layout={layout}
              showValues={showValues}
              valuesAutocolor={valuesAutocolor}
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
                  keys={keys}
                  disabledKeys={disabledKeys}
                  stackMode={stackMode}
                  groupMode={groupMode}
                  selectors={tooltip.selectors}
                  isList={tooltip.selectors.length > 1}
                />
              )}
            </ChartTooltip>
          </>
        )}
      </ChartBase>
    </>
  );
};

export default BarChart;
