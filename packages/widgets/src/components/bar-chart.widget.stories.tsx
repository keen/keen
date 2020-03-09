import * as React from 'react';
import { number, text, object } from '@storybook/addon-knobs';
import {
  cardKnobs,
  axisXKnobs,
  axisYKnobs,
  gridKnobs,
  layoutKnobs,
  typographyKnobs,
  legendKnobs,
} from '@keen.io/storybook-utils';
import { Typography } from '@keen.io/ui-core';
import { theme as keenTheme } from '@keen.io/charts';

import { BarChartWidget } from './bar-chart.widget';
import { chartData } from './bar-chart.widget.fixtures';

import { widgetSettings } from '../widget-settings';

export default {
  title: 'Widgets / Bar Chart Widget',
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
});

export const withKnobs = () => (
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
      keys={['people', 'licenses', 'cars', 'documents']}
      layout={layoutKnobs('Chart') as any}
      margins={object(
        'Margins',
        { top: 30, right: 20, bottom: 50, left: 40 },
        'Chart'
      )}
      theme={createThemeKnobs()}
      data={chartData}
    />
  </div>
);
