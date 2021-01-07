import React, { FC } from 'react';
import {
  FunnelChart,
  FunnelChartSettings,
  theme as defaultTheme,
} from '@keen.io/charts';

import WidgetHeading from '../widget-heading.component';
import ChartWidget from '../chart-widget.component';
import { Content } from './funnel-chart.widget.styles';

import { legendSettings } from '../../widget-settings';

import { WidgetSettings, LegendSettings } from '../../types';

type Props = { legend: LegendSettings } & WidgetSettings & FunnelChartSettings;

/** Funnel Chart widget integrated with other components */
export const FunnelChartWidget: FC<Props> = ({
  legend = legendSettings,
  theme = defaultTheme,
  title,
  subtitle,
  card,
  ...props
}) => (
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
      <Content>
        <FunnelChart theme={theme} {...props} />
      </Content>
    )}
  />
);

export default FunnelChartWidget;
