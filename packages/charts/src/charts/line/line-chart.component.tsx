import React, { FC, useRef } from 'react';
import { useTooltip } from '@keen.io/react-hooks';
import { ScaleSettings } from '@keen.io/charts-utils';

import { generateLines, showAllMarks } from './utils';

import { Lines } from './components';

import {
  ChartBase,
  ChartTooltip,
  Axes,
  Grid,
  ZeroIntersection,
} from '../../components';
import { useDynamicChartLayout } from '../../hooks';

import { theme as defaultTheme } from '../../theme';
import { DEFAULT_MARGINS } from './constants';

import {
  CommonChartSettings,
  GroupMode,
  StackMode,
  TooltipSettings,
} from '../../types';

import { CurveType } from './types';

import { MAX_TOOLTIP_WIDTH_FACTOR } from '../bar/constants';
import LineChartTooltip from '../../components/distributed-chart-tooltip';

export type Props = {
  /** chart data */
  data: Record<string, any>[];
  /** Name of data object property used to create labels on axis */
  labelSelector: string;
  /** Minimum value for axis */
  minValue?: number | 'auto';
  /** Maximum value for axis */
  maxValue?: number | 'auto';
  /** Title for X axis */
  xAxisTitle?: string;
  /** Title for Y axis */
  yAxisTitle?: string;
  /** Keys picked from data object used to generate lines */
  keys?: string[];
  /** Keys that are disabled for rendering data series */
  disabledKeys?: string[];
  /** Marks radius */
  markRadius?: number;
  /** Line thickness */
  strokeWidth?: number;
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
  /** Area mode */
  areaMode?: boolean;
  /** Gradient on/off */
  gradient?: boolean;
  /** Automatically adjusts margins for visualization */
  useDynamicLayout?: boolean;
  /** Tooltip settings */
  tooltipSettings?: TooltipSettings;
} & CommonChartSettings;

export const LineChart: FC<Props> = ({
  data,
  svgDimensions,
  labelSelector,
  useDynamicLayout = true,
  theme = defaultTheme,
  margins = DEFAULT_MARGINS,
  minValue = 'auto',
  maxValue = 'auto',
  keys = ['value'],
  disabledKeys = [],
  markRadius = 4,
  strokeWidth = 1,
  curve = 'linear',
  stackMode = 'normal',
  groupMode = 'grouped',
  xScaleSettings = { precision: 'month', type: 'time', useUTC: false },
  yScaleSettings = { type: 'linear' },
  areaMode = false,
  gradient = true,
  xAxisTitle,
  yAxisTitle,
  tooltipSettings = {},
}) => {
  const {
    layoutMargins,
    layoutReady,
    setLayoutReady,
    setLayoutMargins,
  } = useDynamicChartLayout(useDynamicLayout, margins);

  const {
    lines,
    marks,
    xScale,
    yScale,
    steps,
    stepMode,
    areas,
    gradientBlocks,
    localizedData,
  } = generateLines({
    data,
    xScaleSettings,
    yScaleSettings,
    margins: layoutMargins,
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
    areaMode,
  });
  const svgElement = useRef<SVGSVGElement>(null);
  const computeTooltipRelative = !showAllMarks(stepMode, marks, lines);

  const {
    tooltipVisible,
    tooltipPosition,
    tooltipSelectors,
    updateTooltipPosition,
    hideTooltip,
  } = useTooltip(svgElement, computeTooltipRelative);

  const { tooltip: themeTooltipSettings } = theme;
  return (
    <ChartBase
      ref={svgElement}
      theme={theme}
      xScaleSettings={xScaleSettings}
      yScaleSettings={yScaleSettings}
      svgDimensions={svgDimensions}
      margins={layoutMargins}
    >
      <Axes
        svgElement={svgElement}
        useDynamicLayout={useDynamicLayout}
        initialMargins={margins}
        onComputeLayout={(margins) => {
          setLayoutMargins(margins);
          setLayoutReady(true);
        }}
        xScale={xScale}
        yScale={yScale}
        xTitle={xAxisTitle}
        yTitle={yAxisTitle}
      />
      {layoutReady && (
        <>
          <Grid xScale={xScale} yScale={yScale} />
          <ZeroIntersection xScale={xScale} yScale={yScale} />
          <Lines
            lines={lines}
            marks={marks}
            steps={steps}
            areas={areas}
            curve={curve}
            gradient={gradient}
            groupMode={groupMode}
            stackMode={stackMode}
            areaMode={areaMode}
            stepMode={stepMode}
            gradientBlocks={gradientBlocks}
            onMarkMouseEnter={(e, selectors) => {
              if (themeTooltipSettings.enabled) {
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
            hasSpacing={false}
          >
            {tooltipSelectors && (
              <LineChartTooltip
                data={localizedData}
                keys={keys}
                disabledKeys={disabledKeys}
                isPercentage={stackMode === 'percent'}
                isStacked={groupMode === 'stacked'}
                selectors={tooltipSelectors}
                tooltipSettings={tooltipSettings}
                labelSelector={labelSelector}
                maxWidth={MAX_TOOLTIP_WIDTH_FACTOR * svgDimensions.width}
                isTimePrecise={xScaleSettings?.type === 'time'}
              />
            )}
          </ChartTooltip>
        </>
      )}
    </ChartBase>
  );
};

export default LineChart;
