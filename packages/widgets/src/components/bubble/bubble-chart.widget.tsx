import React, { FC } from 'react';
import { max, min } from 'd3-array';
import {
  BubbleChart,
  BubbleChartSettings,
  ResponsiveWrapper,
  BubbleLegend,
  SeriesLegend,
  theme as defaultTheme,
  bubbleColorScale,
  getValues,
} from '@keen.io/charts';

import { LegendContainer } from './bubble-chart.styles';

import ChartWidget from '../chart-widget.component';
import WidgetHeading from '../widget-heading.component';

import {
  ContentSocket,
  TitleSocket,
  LegendSocket,
} from '../widget-sockets.component';

import { createLegendLabels } from './bubble-chart.widget.utils';

import { useLegend } from '../../hooks';

import { bubbleLegendSettings } from './widget-settings';
import { WidgetSettings, BubbleWidgetLegendSettings } from '../../types';

export type Props = { legend: BubbleWidgetLegendSettings } & WidgetSettings &
  BubbleChartSettings;

/** Bubble Chart widget integrated with other components */
export const BubbleChartWidget: FC<Props> = ({
  legend = bubbleLegendSettings,
  theme = defaultTheme,
  title,
  subtitle,
  card,
  ...props
}) => {
  const { data, valueKey } = props;
  const values = getValues(data, [valueKey]);
  const minimumVal = min(values);
  const maximumVal = max(values);

  const { position, series, bubble } = legend;
  const scaleColor = bubbleColorScale(theme.colors);

  const { disabledKeys, updateKeys } = useLegend();
  const labels = createLegendLabels(data, props.labelSelector);

  const alignment = series.enabled ? series.alignment : bubble.alignment;
  const layout = series.enabled ? series.layout : bubble.layout;

  const { minAreaRadius, maxAreaRadius } = props;

  const maxHeight = bubble.enabled ? 50 : 100;
  return (
    <ChartWidget
      cardSettings={card}
      legendSettings={{
        position,
        alignment,
        layout,
      }}
    >
      <TitleSocket>
        <WidgetHeading title={title} subtitle={subtitle} />
      </TitleSocket>
      <LegendSocket>
        <LegendContainer position={position} maxHeight={maxHeight}>
          {series.enabled && (
            <SeriesLegend
              {...series}
              position={position}
              onClick={updateKeys}
              labels={labels.map((el: string) => ({
                name: el,
                color: scaleColor(el),
              }))}
            />
          )}
          {bubble.enabled && (
            <BubbleLegend
              domain={[minimumVal, maximumVal]}
              minRadius={minAreaRadius}
              maxRadius={maxAreaRadius}
              {...bubble}
            />
          )}
        </LegendContainer>
      </LegendSocket>
      <ContentSocket>
        <ResponsiveWrapper>
          {(width: number, height: number) => (
            <BubbleChart
              disabledKeys={disabledKeys}
              theme={theme}
              svgDimensions={{ width, height }}
              {...props}
            />
          )}
        </ResponsiveWrapper>
      </ContentSocket>
    </ChartWidget>
  );
};

export default BubbleChartWidget;
