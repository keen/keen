import * as React from 'react';
import { number, text } from '@storybook/addon-knobs';
import {
  cardKnobs,
  axisXKnobs,
  axisYKnobs,
  layoutKnobs,
  legendKnobs,
  typographyKnobs,
  colorModeKnobs,
} from '@keen.io/storybook-utils';
import { Typography } from '@keen.io/ui-core';
import { theme as keenTheme } from '@keen.io/charts';

import { HeatmapChartWidget } from './heatmap-chart.widget';
import { chartData } from './heatmap-chart.widget.fixtures';

import { widgetSettings } from '../../widget-settings';

export default {
  title: 'Visualizations /Heatmap Chart / Widget',
  parameters: {
    component: HeatmapChartWidget,
    componentSubtitle: 'Widget to be directly integrated on website',
  },
};

const createThemeKnobs = () => ({
  ...keenTheme,
  axisX: axisXKnobs('Axis X'),
  axisY: axisYKnobs('Axis Y'),
});

export const widget = () => (
  <div style={{ width: '700px', height: '400px' }}>
    <HeatmapChartWidget
      title={{
        content: text('Title', 'Widget Title', 'Title Settings'),
        typography: typographyKnobs(
          'Title Settings',
          widgetSettings.title.typography as Typography
        ),
      }}
      subtitle={{
        content: text('Subtitle', 'Widget Subtitle', 'Subtitle Settings'),
        typography: typographyKnobs(
          'Subtitle Settings',
          widgetSettings.subtitle.typography as Typography
        ),
      }}
      card={cardKnobs('Card')}
      legend={legendKnobs('Legend') as any}
      labelSelector="name"
      padding={number('padding', 2, {}, 'Chart')}
      colorMode={colorModeKnobs('Chart') as any}
      steps={number('steps', 2, {}, 'Chart')}
      keys={['people', 'licenses', 'cars', 'documents']}
      layout={layoutKnobs('Chart') as any}
      xAxisTitle={text('Title', 'Horizontal Title', 'Axis X Title')}
      yAxisTitle={text('Title', 'Vertical Title', 'Axis Y Title')}
      theme={createThemeKnobs()}
      data={chartData}
      tags={[{ label: 'Widget tag', variant: 'gray' }]}
    />
  </div>
);
