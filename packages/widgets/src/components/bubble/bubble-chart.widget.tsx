import React, { FC } from 'react';
import {
  BubbleChart,
  BubbleChartSettings,
  ResponsiveWrapper,
  BubbleLegend,
  SeriesLegend,
  theme as defaultTheme,
  bubbleColorScale,
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

import { legendSettings } from '../../widget-settings';
import { WidgetSettings } from '../../types';

import { getValues } from '../../../../charts/src/utils/data.utils';
import { max, min } from 'd3-array';

export type Props = WidgetSettings & BubbleChartSettings;

/** Bubble Chart widget integrated with other components */
export const BubbleChartWidget: FC<Props> = ({
  legend = {
    series: legendSettings,
    bubble: legendSettings,
    ...legendSettings,
  },
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
        <LegendContainer position={position}>
          {series.enabled && (
            <SeriesLegend
              {...series}
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
