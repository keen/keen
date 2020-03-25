import React, { FC } from 'react';
import {
  DonutChart,
  DonutChartSettings,
  ResponsiveWrapper,
  Legend,
  theme as defaultTheme,
} from '@keen.io/charts';

import WidgetHeading from '../widget-heading.component';
import ChartWidget from '../chart-widget.component';
import {
  ContentSocket,
  LegendSocket,
  TitleSocket,
} from '../widget-sockets.component';

import { createLegendLabels } from './donut-chart.widget.utils';

import { legendSettings } from '../../widget-settings';
import { useLegend } from '../../hooks';

import { WidgetSettings } from '../../types';

type Props = WidgetSettings & DonutChartSettings;

/** Donut Chart widget integrated with other components */
export const DonutChartWidget: FC<Props> = ({
  legend = legendSettings,
  theme = defaultTheme,
  title,
  subtitle,
  card,
  ...props
}) => {
  const { disabledKeys, updateKeys } = useLegend();

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
      {legend.enabled && (
        <LegendSocket>
          <Legend
            {...legend}
            onClick={updateKeys}
            labels={createLegendLabels(
              props.data,
              theme.colors,
              props.labelSelector
            )}
          />
        </LegendSocket>
      )}
      <ContentSocket>
        <ResponsiveWrapper>
          {(width: number, height: number) => (
            <DonutChart
              {...props}
              disabledLabels={disabledKeys}
              svgDimensions={{ width, height }}
              theme={theme}
            />
          )}
        </ResponsiveWrapper>
      </ContentSocket>
    </ChartWidget>
  );
};
export default DonutChartWidget;
