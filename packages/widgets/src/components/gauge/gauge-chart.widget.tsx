import React, { FC } from 'react';
import {
  GaugeChart,
  GaugeChartSettings,
  ResponsiveWrapper,
  theme as defaultTheme,
} from '@keen.io/charts';

import WidgetHeading from '../widget-heading.component';
import ChartWidget from '../chart-widget';

import { legendSettings } from '../../widget-settings';

import { WidgetSettings, LegendSettings } from '../../types';

type Props = { legend: LegendSettings } & WidgetSettings & GaugeChartSettings;

/** Gauge Chart widget integrated with other components */
export const GaugeChartWidget: FC<Props> = ({
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
      title={() => <WidgetHeading title={title} subtitle={subtitle} />}
      legend={() => null}
      content={() => (
        <ResponsiveWrapper>
          {(width: number, height: number) => (
            <GaugeChart
              {...props}
              svgDimensions={{ width, height }}
              theme={theme}
            />
          )}
        </ResponsiveWrapper>
      )}
    />
  );
};
export default GaugeChartWidget;
