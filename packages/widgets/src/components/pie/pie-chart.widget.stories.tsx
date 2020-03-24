import * as React from 'react';
import { text, object, boolean, select } from '@storybook/addon-knobs';
import {
  cardKnobs,
  typographyKnobs,
  legendKnobs,
} from '@keen.io/storybook-utils';
import { Typography } from '@keen.io/ui-core';
import { theme as keenTheme } from '@keen.io/charts';

import { PieChartWidget } from './pie-chart.widget';
import { chartData } from './pie-chart.widget.fixtures';

import { widgetSettings } from '../../widget-settings';

export default {
  title: 'Visualizations|Pie Chart|Widget',
  parameters: {
    component: PieChartWidget,
    componentSubtitle: 'Widget to be directly integrated on website',
  },
};

export const widget = () => (
  <div style={{ width: '700px', height: '400px' }}>
    <PieChartWidget
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
      labelsAutocolor={boolean('Autocolor', true, 'Chart')}
      labelsPosition={select(
        'Labels Position',
        { inside: 'inside', outside: 'outside' },
        'inside',
        'Chart'
      )}
      keys={['buy', 'sold']}
      labelSelector="name"
      margins={object(
        'Margins',
        { top: 30, right: 20, bottom: 50, left: 40 },
        'Chart'
      )}
      theme={keenTheme}
      data={chartData}
    />
  </div>
);
