import React, { FC } from 'react';
import {
  BarChart,
  BarChartSettings,
  ResponsiveWrapper,
  Legend,
  theme as defaultTheme,
} from '@keen.io/charts';

import ChartWidget from '../chart-widget.component';
import WidgetHeading from '../widget-heading.component';

import {
  ContentSocket,
  LegendSocket,
  TitleSocket,
} from '../widget-sockets.component';

import { useLegend } from '../../hooks';

import { legendSettings } from '../../widget-settings';
import { WidgetSettings } from '../../types';

type Props = WidgetSettings & BarChartSettings;

/** Bar Chart widget integrated with other components */
export const BarChartWidget: FC<Props> = ({
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
            labels={props.keys.map((key, idx) => ({
              name: key,
              color: theme.colors[idx],
            }))}
          />
        </LegendSocket>
      )}
      <ContentSocket>
        <ResponsiveWrapper>
          {(width: number, height: number) => (
            <BarChart
              theme={theme}
              disabledKeys={disabledKeys}
              svgDimensions={{ width, height }}
              {...props}
            />
          )}
        </ResponsiveWrapper>
      </ContentSocket>
    </ChartWidget>
  );
};
export default BarChartWidget;
