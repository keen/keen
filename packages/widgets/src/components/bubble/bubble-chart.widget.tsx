import React, { FC } from 'react';
import {
  BubbleChart,
  BubbleChartSettings,
  ResponsiveWrapper,
  BubbleLegend,
  theme as defaultTheme,
} from '@keen.io/charts';

import ChartWidget from '../chart-widget.component';
import WidgetHeading from '../widget-heading.component';

import {
  ContentSocket,
  TitleSocket,
  LegendSocket,
} from '../widget-sockets.component';

import { legendSettings } from '../../widget-settings';
import { WidgetSettings } from '../../types';

import { getValues } from '../../../../charts/src/utils/data.utils';
import { max, min } from 'd3-array';

export type Props = WidgetSettings & BubbleChartSettings;

/** Bubble Chart widget integrated with other components */
export const BubbleChartWidget: FC<Props> = ({
  legend = legendSettings,
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

  const { minAreaRadius, maxAreaRadius } = props;
  return (
    <ChartWidget
      cardSettings={card}
      legendSettings={{
        position: 'left',
        alignment: 'right',
        layout: legend.layout,
      }}
    >
      <TitleSocket>
        <WidgetHeading title={title} subtitle={subtitle} />
      </TitleSocket>
      {legend.enabled && (
        <LegendSocket>
          <BubbleLegend
            domain={[minimumVal, maximumVal]}
            minRadius={minAreaRadius}
            maxRadius={maxAreaRadius}
            {...legend}
          />
        </LegendSocket>
      )}
      <ContentSocket>
        <ResponsiveWrapper>
          {(width: number, height: number) => (
            <BubbleChart
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
