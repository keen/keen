import React, { FC, useState, useEffect } from 'react';
import { RangeSlider } from '@keen.io/ui-core';
import { useSlider } from '@keen.io/react-hooks';
import {
  ChoroplethChart,
  ChoroplethChartSettings,
  GeoAreaMatchStatus,
  ResponsiveWrapper,
  LegendBase,
  fetchMapTopology,
  theme as defaultTheme,
} from '@keen.io/charts';

import { ChartInteractionLegend, GeoMatchError } from './components';

import ChartWidget from '../chart-widget';
import WidgetHeading from '../widget-heading.component';
import WidgetLoader from '../widget-loader.component';

import { choroplethLegendSettings } from './widget-settings';
import { WidgetSettings, LegendSettings } from '../../types';
import { colors } from '@keen.io/colors';

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
  tags,
  geographicArea = 'world',
  colorSteps,
  ...props
}) => {
  const [geoMatchError, setGeoMatchError] = useState(false);
  const [topology, setTopology] = useState<any>(null);
  const [loading, setLoading] = useState(null);

  const { min, max } = useSlider(props.data, [props.valueKey]);
  const minValue = min > 0 && max > 0 ? 0 : min;
  const maxValue = min < 0 && max < 0 ? 0 : max;
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
      title={() => (
        <WidgetHeading title={title} subtitle={subtitle} tags={tags} />
      )}
      legend={() =>
        legend.enabled &&
        !geoMatchError && (
          <LegendBase spacing="thin" fullDimension {...legend}>
            <RangeSlider
              minimum={minValue}
              maximum={maxValue}
              tooltipSettings={{
                enabled: true,
                position: 'right',
                theme: 'light',
                typography: {
                  fontSize: 11,
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontColor: colors.black['500'],
                },
                formatValue: props?.tooltipSettings?.formatValue,
              }}
              layout={legend.layout}
              colors={theme.colors}
              onChange={(min, max) => setRange({ min, max })}
              colorSteps={colorSteps}
            />
          </LegendBase>
        )
      }
      content={() => {
        if (loading) return <WidgetLoader />;
        else if (topology) {
          return (
            <ResponsiveWrapper>
              {(width: number, height: number) => (
                <>
                  {geoMatchError ? (
                    <GeoMatchError geographicArea={geographicArea} />
                  ) : (
                    <>
                      <ChoroplethChart
                        theme={theme}
                        svgDimensions={{ width, height }}
                        topology={topology}
                        colorSteps={colorSteps}
                        valuesRange={range}
                        onUpdateGeoMatchStatus={(status) =>
                          setGeoMatchError(
                            status === GeoAreaMatchStatus.NOT_MATCHED
                          )
                        }
                        {...props}
                      />
                      <ChartInteractionLegend />
                    </>
                  )}
                </>
              )}
            </ResponsiveWrapper>
          );
        }
      }}
    />
  );
};

export default ChoroplethChartWidget;
