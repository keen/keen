/*eslint @typescript-eslint/no-empty-function: 0*/
import React, { FC, useState } from 'react';
import {
  HeatmapChart,
  HeatmapChartSettings,
  ResponsiveWrapper,
  LegendBase,
  theme as defaultTheme,
} from '@keen.io/charts';

import { RangeSlider } from '@keen.io/ui-core';
import { useSlider } from '@keen.io/react-hooks';

import ChartWidget from '../chart-widget';
import WidgetHeading from '../widget-heading.component';

import { legendSettings } from '../../widget-settings';
import { WidgetSettings, LegendSettings } from '../../types';
import { colors } from '@keen.io/colors';

type Props = { legend: LegendSettings } & WidgetSettings & HeatmapChartSettings;

/** Heatmap Chart widget integrated with other components */
export const HeatmapChartWidget: FC<Props> = ({
  title,
  subtitle,
  legend = legendSettings,
  theme = defaultTheme,
  card,
  tags,
  steps,
  ...props
}) => {
  const { min, max } = useSlider(props.data, props.keys);
  const [range, setRange] = useState({ min, max });

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
          <LegendBase fullDimension spacing="thin" {...legend}>
            <RangeSlider
              key={`range-slider-${legend.position}`}
              minimum={min}
              maximum={max}
              layout={legend.layout}
              colors={theme.colors}
              onChange={(min, max) => {
                setRange({ min, max });
              }}
              colorSteps={steps}
              tooltipSettings={{
                enabled: true,
                position: 'bottom',
                theme: 'light',
                typography: {
                  fontSize: 11,
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontColor: colors.black['500'],
                },
              }}
            />
          </LegendBase>
        )
      }
      content={() => (
        <ResponsiveWrapper>
          {(width: number, height: number) => (
            <HeatmapChart
              {...props}
              theme={theme}
              range={range}
              steps={steps}
              svgDimensions={{ width, height }}
            />
          )}
        </ResponsiveWrapper>
      )}
    />
  );
};

export default HeatmapChartWidget;
