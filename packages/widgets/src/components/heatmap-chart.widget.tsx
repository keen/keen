/*eslint @typescript-eslint/no-empty-function: 0*/
import React, { FC } from 'react';
import {
  HeatmapChart,
  HeatmapChartSettings,
  ResponsiveWrapper,
  theme as defaultTheme,
} from '@keen.io/charts';

import ChartWidget from './chart-widget.component';
import WidgetHeading from './widget-heading.component';
import { ContentSocket, TitleSocket } from './widget-sockets.component';

import { legendSettings } from '../widget-settings';
import { WidgetSettings } from '../types';

type Props = WidgetSettings & HeatmapChartSettings;

/** Line Chart widget integrated with other components */
export const HeatmapChartWidget: FC<Props> = ({
  title,
  subtitle,
  legend = legendSettings,
  theme = defaultTheme,
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
            <HeatmapChart
              {...props}
              theme={theme}
              svgDimensions={{ width, height }}
            />
          )}
        </ResponsiveWrapper>
      </ContentSocket>
    </ChartWidget>
  );
};

export default HeatmapChartWidget;
