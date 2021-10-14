import React, { FC, useState } from 'react';
import {
  PieChart,
  PieChartSettings,
  ResponsiveWrapper,
  SeriesLegend,
  theme as defaultTheme,
} from '@keen.io/charts';
import { useLegend, useDataSeriesOffset } from '@keen.io/react-hooks';

import WidgetHeading from '../widget-heading.component';
import ChartWidget from '../chart-widget';

import { createLegendLabels } from './pie-chart.widget.utils';

import { legendSettings } from '../../widget-settings';

import { WidgetSettings, LegendSettings } from '../../types';

type Props = { legend: LegendSettings } & WidgetSettings & PieChartSettings;

/** Pie Chart widget integrated with other components */
export const PieChartWidget: FC<Props> = ({
  legend = legendSettings,
  theme = defaultTheme,
  title,
  subtitle,
  card,
  tags,
  ...props
}) => {
  const { disabledKeys, updateKeys } = useLegend();

  const [sortedDataSeries, setSortedDataSeries] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const { setDataSeriesOffset, dataSeriesOffset } = useDataSeriesOffset(
    theme.colors.length,
    legend.enabled
  );

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
        legend.enabled &&
        !!sortedDataSeries.length && (
          <SeriesLegend
            {...legend}
            disabledKeys={disabledKeys}
            onClick={(key, disabled) => {
              updateKeys(key, disabled);
            }}
            onActivate={(label: string) => setActiveKey(label)}
            onDeactivate={() => setActiveKey(null)}
            colorPalette={theme.colors}
            dataSeries={createLegendLabels(
              sortedDataSeries,
              theme.colors,
              dataSeriesOffset
            )}
            onOffsetUpdate={(offset) => setDataSeriesOffset(offset)}
          />
        )
      }
      content={() => (
        <ResponsiveWrapper>
          {(width: number, height: number) => (
            <PieChart
              {...props}
              onFinalDataStack={(res) => setSortedDataSeries(res)}
              disabledLabels={disabledKeys}
              svgDimensions={{ width, height }}
              activeKey={activeKey}
              theme={theme}
              dataSeriesOffset={dataSeriesOffset}
            />
          )}
        </ResponsiveWrapper>
      )}
    />
  );
};
export default PieChartWidget;
