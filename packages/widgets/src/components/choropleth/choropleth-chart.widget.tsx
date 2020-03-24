import React, { FC, useState, useEffect } from 'react';
import {
  ChoroplethChart,
  ChoroplethChartSettings,
  ResponsiveWrapper,
  fetchMapTopology,
  theme as defaultTheme,
} from '@keen.io/charts';

import ChartWidget from '../chart-widget.component';
import WidgetHeading from '../widget-heading.component';
import WidgetLoader from '../widget-loader.component';

import { ContentSocket, TitleSocket } from '../widget-sockets.component';

import { legendSettings } from '../../widget-settings';
import { WidgetSettings } from '../../types';

export type Props = WidgetSettings &
  ChoroplethChartSettings & {
    geographicArea?: 'us' | 'world';
  };

/** Choropleth Chart widget integrated with other components */
export const ChoroplethChartWidget: FC<Props> = ({
  legend = legendSettings,
  theme = defaultTheme,
  title,
  subtitle,
  card,
  geographicArea = 'world',
  ...props
}) => {
  const [topology, setTopology] = useState<any>(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (geographicArea) {
      setLoading(true);
      fetchMapTopology(geographicArea).then(mapTopology => {
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
      <ContentSocket>
        {loading && <WidgetLoader />}
        {topology && (
          <ResponsiveWrapper>
            {(width: number, height: number) => (
              <ChoroplethChart
                theme={theme}
                svgDimensions={{ width, height }}
                topology={topology}
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
