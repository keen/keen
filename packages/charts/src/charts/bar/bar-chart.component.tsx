import React, { useState, useRef, FC } from 'react';
import { Layout } from '@keen.io/ui-core';

import { generateBars } from './utils/chart.utils';
import { getSelectors } from './utils/tooltip.utils';

import Bars from './bars.component';
import BarTooltipContent from './bar-tooltip-content.component';

import {
  ChartBase,
  ChartTooltip,
  Grid,
  Axes,
  AxisTitle,
} from '../../components';

import { margins as defaultMargins, theme as defaultTheme } from '../../theme';

import { TOOLTIP_HIDE_TIME } from '../../constants';

import {
  CommonChartSettings,
  TooltipState,
  ScaleSettings,
  GroupMode,
  StackMode,
  AxisTitle as AxisTitleType,
} from '../../types';

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
  /** X Scale settings */
  xScaleSettings?: ScaleSettings;
  /** Y Scale settings */
  yScaleSettings?: ScaleSettings;
  /** X axis title settings */
  xAxisTitle?: AxisTitleType;
  /** Y axis title settings */
  yAxisTitle?: AxisTitleType;
  /** Group mode */
  groupMode?: GroupMode;
  /** Stack mode */
  stackMode?: StackMode;
} & CommonChartSettings;

/**
- Support two different layouts - horizontal and vertical.
- Automatically adjust render mode based on content.
- Fully customized Typography and Card wrapper.
- Could be used to disable series on chart.
**/
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
  showValues = false,
  valuesAutocolor = true,
  xAxisTitle,
  yAxisTitle,
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

  const { tooltip: tooltipSettings, axisTitle: axisTitleSettings } = theme;

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
        {(xAxisTitle || yAxisTitle) && (
          <AxisTitle x={xAxisTitle} y={yAxisTitle} {...axisTitleSettings} />
        )}
        <Axes xScale={xScale} yScale={yScale} />
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
      </ChartBase>
    </>
  );
};

export default BarChart;
