import React, { FC, useState, useEffect } from 'react';
import { RangeSlider } from '@keen.io/ui-core';
import { useSlider } from '@keen.io/react-hooks';
import {
  ChoroplethChart,
  ChoroplethChartSettings,
  ResponsiveWrapper,
  LegendBase,
  fetchMapTopology,
  theme as defaultTheme,
} from '@keen.io/charts';

import ChartWidget from '../chart-widget.component';
import WidgetHeading from '../widget-heading.component';
import WidgetLoader from '../widget-loader.component';

import {
  ContentSocket,
  LegendSocket,
  TitleSocket,
} from '../widget-sockets.component';

import { choroplethLegendSettings } from './widget-settings';
import { WidgetSettings, LegendSettings } from '../../types';

export type Props = { legend: LegendSettings } & WidgetSettings &
  ChoroplethChartSettings & {
    geographicArea?: 'us' | 'world';
  };

/** Choropleth Chart widget integrated with other components */
export const ChoroplethChartWidget: FC<Props> = ({
  legend = choroplethLegendSettings,
  theme = defaultTheme,
  title,
  subtitle,
  card,
  geographicArea = 'world',
  colorSteps,
  ...props
}) => {
  const [topology, setTopology] = useState<any>(null);
  const [loading, setLoading] = useState(null);

  const { max } = useSlider(props.data, [props.valueKey]);
  const [range, setRange] = useState(null);

  useEffect(() => {
    if (geographicArea) {
      setLoading(true);
      fetchMapTopology(geographicArea).then((mapTopology) => {
        setTopology(mapTopology);
        setLoading(false);
      });
    }
  }, [geographicArea]);

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
          <LegendBase spacing="thin" fullDimension {...legend}>
            <RangeSlider
              minimum={0}
              maximum={max}
              tooltipSettings={{
                enabled: true,
                position: 'right',
              }}
              layout={legend.layout}
              colors={theme.colors}
              onChange={(min, max) => setRange({ min, max })}
              colorSteps={colorSteps}
            />
          </LegendBase>
        </LegendSocket>
      )}
      <ContentSocket>
        {loading && <WidgetLoader />}
        {topology && !loading && (
          <ResponsiveWrapper>
            {(width: number, height: number) => (
              <ChoroplethChart
                theme={theme}
                svgDimensions={{ width, height }}
                topology={topology}
                colorSteps={colorSteps}
                valuesRange={range}
                {...props}
              />
            )}
          </ResponsiveWrapper>
        )}
      </ContentSocket>
    </ChartWidget>
  );
};

export default ChoroplethChartWidget;
