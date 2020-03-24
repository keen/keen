import React, { FC } from 'react';
import {
  BubbleChart,
  BubbleChartSettings,
  ResponsiveWrapper,
  theme as defaultTheme,
} from '@keen.io/charts';

import ChartWidget from '../chart-widget.component';
import WidgetHeading from '../widget-heading.component';

import { ContentSocket, TitleSocket } from '../widget-sockets.component';

import { legendSettings } from '../../widget-settings';
import { WidgetSettings } from '../../types';

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
  return (
    <ChartWidget
      cardSettings={card}
      legendSettings={{
        position: legend.position,
        alignment: legend.alignment,
        layout: legend.layout,
      }}
    >
      <TitleSocket>
        <WidgetHeading title={title} subtitle={subtitle} />
      </TitleSocket>
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
