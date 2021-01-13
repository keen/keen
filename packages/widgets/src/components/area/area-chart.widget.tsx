/*eslint @typescript-eslint/no-empty-function: 0*/
import React, { FC } from 'react';
import {
  AreaChart,
  AreaChartSettings,
  ResponsiveWrapper,
  SeriesLegend,
  theme as defaultTheme,
  sortAreaKeys,
} from '@keen.io/charts';
import { useLegend } from '@keen.io/react-hooks';

import ChartWidget from '../chart-widget.component';
import WidgetHeading from '../widget-heading.component';

import { legendSettings } from '../../widget-settings';
import { WidgetSettings, LegendSettings } from '../../types';

type Props = { legend: LegendSettings } & WidgetSettings & AreaChartSettings;

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

  const sortedKeys = sortAreaKeys(props.data, props.keys);

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
            labels={sortedKeys.map((key: string, idx: number) => ({
              name: key,
              color: theme.colors[idx],
            }))}
          />
        )
      }
      content={() => (
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
      )}
    />
  );
};

export default AreaChartWidget;
