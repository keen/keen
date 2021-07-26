import React, { FC, useState } from 'react';
import {
  BarChart,
  BarChartSettings,
  ResponsiveWrapper,
  SeriesLegend,
  theme as defaultTheme,
} from '@keen.io/charts';
import { useLegend } from '@keen.io/react-hooks';

import ChartWidget from '../chart-widget';
import WidgetHeading from '../widget-heading.component';

import { legendSettings } from '../../widget-settings';
import { WidgetSettings, LegendSettings } from '../../types';

type Props = { legend: LegendSettings } & WidgetSettings & BarChartSettings;

/** Bar Chart widget integrated with other components */
export const BarChartWidget: FC<Props> = ({
  legend = legendSettings,
  theme = defaultTheme,
  title,
  subtitle,
  card,
  tags,
  ...props
}) => {
  const { disabledKeys, updateKeys } = useLegend();
  const [activeKey, setActiveKey] = useState<string>(null);

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
            onClick={updateKeys}
            onActivate={(label: string) => setActiveKey(label)}
            onDeactivate={() => setActiveKey(null)}
            colorPalette={theme.colors}
            dataSeries={props.keys.map((key, idx) => ({
              name: key,
              color: theme.colors[idx],
            }))}
          />
        )
      }
      content={() => (
        <ResponsiveWrapper>
          {(width: number, height: number) => (
            <BarChart
              theme={theme}
              disabledKeys={disabledKeys}
              activeKey={activeKey}
              svgDimensions={{ width, height }}
              {...props}
            />
          )}
        </ResponsiveWrapper>
      )}
    />
  );
};
export default BarChartWidget;
