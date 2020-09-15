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

import ChartWidget from '../chart-widget.component';
import WidgetHeading from '../widget-heading.component';
import {
  ContentSocket,
  LegendSocket,
  TitleSocket,
} from '../widget-sockets.component';

import { legendSettings } from '../../widget-settings';
import { WidgetSettings, LegendSettings } from '../../types';

type Props = { legend: LegendSettings } & WidgetSettings & HeatmapChartSettings;

/** Heatmap Chart widget integrated with other components */
export const HeatmapChartWidget: FC<Props> = ({
  title,
  subtitle,
  legend = legendSettings,
  theme = defaultTheme,
  card,
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
    >
      <TitleSocket>
        <WidgetHeading title={title} subtitle={subtitle} />
      </TitleSocket>
      {legend.enabled && (
        <LegendSocket>
          <LegendBase fullDimension spacing="thin" {...legend}>
            <RangeSlider
              minimum={min}
              maximum={max}
              layout={legend.layout}
              colors={theme.colors}
              onChange={(min, max) => {
                setRange({ min, max });
              }}
              colorSteps={steps}
            />
          </LegendBase>
        </LegendSocket>
      )}
      <ContentSocket>
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
      </ContentSocket>
    </ChartWidget>
  );
};

export default HeatmapChartWidget;
