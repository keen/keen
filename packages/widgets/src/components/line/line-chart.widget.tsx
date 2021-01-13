/*eslint @typescript-eslint/no-empty-function: 0*/
import React, { FC } from 'react';
import {
  LineChart,
  LineChartSettings,
  ResponsiveWrapper,
  SeriesLegend,
  theme as defaultTheme,
} from '@keen.io/charts';
import { useLegend } from '@keen.io/react-hooks';

import ChartWidget from '../chart-widget.component';
import WidgetHeading from '../widget-heading.component';

import { legendSettings } from '../../widget-settings';
import { WidgetSettings, LegendSettings } from '../../types';

type Props = { legend: LegendSettings } & WidgetSettings & LineChartSettings;

/** Line Chart widget integrated with other components */
export const LineChartWidget: FC<Props> = ({
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
      title={() => <WidgetHeading title={title} subtitle={subtitle} />}
      legend={() =>
        legend.enabled && (
          <SeriesLegend
            {...legend}
            onClick={updateKeys}
            labels={props.keys.map((key, idx) => ({
              name: key,
              color: theme.colors[idx],
            }))}
          />
        )
      }
      content={() => (
        <ResponsiveWrapper>
          {(width: number, height: number) => (
            <LineChart
              {...props}
              theme={theme}
              disabledKeys={disabledKeys}
              svgDimensions={{ width, height }}
            />
          )}
        </ResponsiveWrapper>
      )}
    />
  );
};

export default LineChartWidget;
