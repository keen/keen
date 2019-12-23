import React from 'react';
import { BarChart, BarChartSettings, ResponsiveWrapper } from '@keen/charts';

import ChartWidget from './chart-widget.component';
import { ContentSocket, LegendSocket } from './widget-sockets.component';

type Props = {
  showLegend?: boolean;
} & BarChartSettings;

const BarChartWidget = ({ showLegend = true, ...props }: Props) => (
  <ChartWidget>
    {showLegend && <LegendSocket>Legend</LegendSocket>}
    <ContentSocket>
      <ResponsiveWrapper>
        {(width: number, height: number) => (
          <BarChart {...props} svgDimensions={{ width, height }} />
        )}
      </ResponsiveWrapper>
    </ContentSocket>
  </ChartWidget>
);

export default BarChartWidget;
