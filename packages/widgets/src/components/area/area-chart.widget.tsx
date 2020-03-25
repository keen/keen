/*eslint @typescript-eslint/no-empty-function: 0*/
import React, { FC } from 'react';
import {
  AreaChart,
  AreaChartSettings,
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

type Props = WidgetSettings & AreaChartSettings;

/** Area Chart widget integrated with other components */
export const AreaChartWidget: FC<Props> = ({
  title,
  subtitle,
  legend = legendSettings,
  theme = defaultTheme,
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
            <AreaChart
              {...props}
              theme={theme}
              disabledKeys={disabledKeys}
              svgDimensions={{ width, height }}
            />
          )}
        </ResponsiveWrapper>
      </ContentSocket>
    </ChartWidget>
  );
};

export default AreaChartWidget;
