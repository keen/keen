/*eslint @typescript-eslint/no-empty-function: 0*/
import React, { FC, useState } from 'react';
import {
  LineChart,
  LineChartSettings,
  ResponsiveWrapper,
  SeriesLegend,
  theme as defaultTheme,
} from '@keen.io/charts';
import { useLegend } from '@keen.io/react-hooks';
import { sortKeysByValuesSum } from '@keen.io/charts-utils';

import ChartWidget from '../chart-widget';
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
  const [activeKey, setActiveKey] = useState(null);

  const sortedKeys = sortKeysByValuesSum(props.data, props.keys);

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
            onMouseOver={(label: string) => setActiveKey(label)}
            onMouseLeave={() => setActiveKey(null)}
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
            <LineChart
              {...props}
              theme={theme}
              disabledKeys={disabledKeys}
              svgDimensions={{ width, height }}
              activeKey={activeKey}
            />
          )}
        </ResponsiveWrapper>
      )}
    />
  );
};

export default LineChartWidget;
