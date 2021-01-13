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
} from '@keen.io/charts';
import { getValues } from '@keen.io/charts-utils';
import { useLegend } from '@keen.io/react-hooks';

import { LegendContainer } from './bubble-chart.styles';

import ChartWidget from '../chart-widget';
import WidgetHeading from '../widget-heading.component';

import { createLegendLabels } from './bubble-chart.widget.utils';

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
      title={() => <WidgetHeading title={title} subtitle={subtitle} />}
      legend={() => (
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
      )}
      content={() => (
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
      )}
    />
  );
};

export default BubbleChartWidget;
