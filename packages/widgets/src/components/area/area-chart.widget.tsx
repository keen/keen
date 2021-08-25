/*eslint @typescript-eslint/no-empty-function: 0*/
import React, { FC, useState } from 'react';
import {
  AreaChart,
  AreaChartSettings,
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

type Props = { legend: LegendSettings } & WidgetSettings & AreaChartSettings;

/** Area Chart widget integrated with other components */
export const AreaChartWidget: FC<Props> = ({
  title,
  subtitle,
  legend = legendSettings,
  theme = defaultTheme,
  card,
  tags,
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
      title={() => (
        <WidgetHeading title={title} subtitle={subtitle} tags={tags} />
      )}
      legend={() =>
        legend.enabled && (
          <SeriesLegend
            {...legend}
            disabledKeys={disabledKeys}
            onClick={updateKeys}
            onActivate={(label: string) => setActiveKey(label)}
            onDeactivate={() => setActiveKey(null)}
            colorPalette={theme.colors}
            dataSeries={sortedKeys.map((key: string, idx: number) => ({
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
              activeKey={activeKey}
            />
          )}
        </ResponsiveWrapper>
      )}
    />
  );
};

export default AreaChartWidget;
