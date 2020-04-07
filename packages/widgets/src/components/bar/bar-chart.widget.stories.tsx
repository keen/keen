import * as React from 'react';
import { number, text, object, boolean } from '@storybook/addon-knobs';
import {
  cardKnobs,
  axisXKnobs,
  axisYKnobs,
  xAxisTitleKnobs,
  yAxisTitleKnobs,
  axisTitleThemeKnobs,
  gridKnobs,
  layoutKnobs,
  typographyKnobs,
  legendKnobs,
} from '@keen.io/storybook-utils';
import { Typography } from '@keen.io/ui-core';
import { theme as keenTheme } from '@keen.io/charts';

import { BarChartWidget } from './bar-chart.widget';
import { chartData } from './bar-chart.widget.fixtures';

import { widgetSettings } from '../../widget-settings';

export default {
  title: 'Visualizations|Bar Chart|Widget',
  parameters: {
    component: BarChartWidget,
    componentSubtitle: 'Widget to be directly integrated on website',
  },
};

const createThemeKnobs = () => ({
  ...keenTheme,
  axisX: axisXKnobs('Axis X'),
  axisY: axisYKnobs('Axis Y'),
  gridX: gridKnobs('Grid X'),
  gridY: gridKnobs('Grid Y'),
  axisTitle: axisTitleThemeKnobs('Axis Title'),
});

export const widget = () => (
  <div style={{ width: '700px', height: '400px' }}>
    <BarChartWidget
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
      barPadding={number('Bar Padding', 0.1, {}, 'Chart')}
      showValues={boolean('Show Values', false, 'Chart')}
      valuesAutocolor={boolean('Autocolor Values', true, 'Chart')}
      keys={['people', 'licenses', 'cars', 'documents']}
      layout={layoutKnobs('Chart') as any}
      xAxisTitle={xAxisTitleKnobs('Axis Title')}
      yAxisTitle={yAxisTitleKnobs('Axis Title')}
      margins={object(
        'Margins',
        { top: 30, right: 20, bottom: 60, left: 60 },
        'Chart'
      )}
      theme={createThemeKnobs()}
      data={chartData}
    />
  </div>
);
