import React, { FC } from 'react';
import {
  BarChart,
  BarChartSettings,
  ResponsiveWrapper,
  Legend,
} from '@keen.io/charts';

import ChartWidget from './chart-widget.component';
import {
  ContentSocket,
  LegendSocket,
  TitleSocket,
} from './widget-sockets.component';

import { LegendSettings } from '../types';

type Props = {
  /** Legend component settings */
  legend?: LegendSettings;
} & BarChartSettings;

/** Bar Chart widget integrated with other components */
export const BarChartWidget: FC<Props> = ({ legend, ...props }) => (
  <ChartWidget
    legendSettings={{
      position: legend.position,
      alignment: legend.alignment,
      layout: legend.layout,
    }}
  >
    <TitleSocket>
      <div>Widget Title</div>
      <div>Widget Sub-Title</div>
    </TitleSocket>
    {legend.enabled && (
      <LegendSocket>
        <Legend
          {...legend}
          onClick={() => {}}
          labels={props.keys.map((key, idx) => ({
            name: key,
            color: props.theme.colors[idx],
          }))}
        />
      </LegendSocket>
    )}
    <ContentSocket>
      <ResponsiveWrapper>
        {(width: number, height: number) => (
          <BarChart {...props} svgDimensions={{ width, height }} />
        )}
      </ResponsiveWrapper>
    </ContentSocket>
  </ChartWidget>
);

export default BarChartWidget;
