import * as React from 'react';
import { text, object, number } from '@storybook/addon-knobs';
import {
  cardKnobs,
  colorModeKnobs,
  typographyKnobs,
} from '@keen.io/storybook-utils';
import { Typography } from '@keen.io/ui-core';
import { theme as keenTheme } from '@keen.io/charts';

import { GaugeChartWidget } from './gauge-chart.widget';
import { chartData } from './gauge-chart.widget.fixtures';

import { widgetSettings } from '../../widget-settings';

export default {
  title: 'Visualizations/Gauge Chart ',
  parameters: {
    component: GaugeChartWidget,
    componentSubtitle: 'Widget to be directly integrated on website',
  },
};

export const widget = () => (
  <div style={{ width: '400px', height: '300px' }}>
    <GaugeChartWidget
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
      valueKey="keen.value"
      minValue={number('Minimum value', 0, {}, 'Chart')}
      maxValue={number('Maximum value', 200, {}, 'Chart')}
      margins={object(
        'Margins',
        { top: 0, right: 0, bottom: 0, left: 0 },
        'Chart'
      )}
      theme={keenTheme}
      colorSteps={number('Color steps', 2, {}, 'Chart')}
      colorMode={colorModeKnobs('Chart', 'continuous') as any}
      data={chartData}
    />
  </div>
);
