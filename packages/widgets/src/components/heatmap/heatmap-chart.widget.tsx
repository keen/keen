/*eslint @typescript-eslint/no-empty-function: 0*/
import React, { FC, useState } from 'react';
import {
  HeatmapChart,
  HeatmapChartSettings,
  ResponsiveWrapper,
  LegendBase,
  theme as defaultTheme,
} from '@keen.io/charts';

import { Slider } from '@keen.io/ui-core';

import ChartWidget from '../chart-widget.component';
import WidgetHeading from '../widget-heading.component';
import {
  ContentSocket,
  LegendSocket,
  TitleSocket,
} from '../widget-sockets.component';

import { useSlider } from '../../hooks/use-slider.hook';

import { legendSettings } from '../../widget-settings';
import { WidgetSettings } from '../../types';

type Props = WidgetSettings & HeatmapChartSettings;

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
  const [range, setRange] = useState(null);

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
          <LegendBase fullDimension {...legend}>
            <Slider
              min={min}
              max={max}
              layout={legend.layout}
              colors={theme.colors}
              controls={{ number: 2 }}
              ruler={{ enabled: false }}
              onChange={res => setRange(res)}
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
              range={range ? range : { min, max }}
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
