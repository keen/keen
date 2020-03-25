import * as React from 'react';
import { text, object, number } from '@storybook/addon-knobs';
import { cardKnobs, typographyKnobs } from '@keen.io/storybook-utils';
import { Typography } from '@keen.io/ui-core';
import { theme as keenTheme } from '@keen.io/charts';

import { BubbleChartWidget } from './bubble-chart.widget';
import { chartData } from './bubble-chart.widget.fixtures';

import { widgetSettings } from '../../widget-settings';

export default {
  title: 'Visualizations|Bubble Chart|Widget',
  parameters: {
    component: BubbleChartWidget,
    componentSubtitle: 'Widget to be directly integrated on website',
  },
};

const createThemeKnobs = () => ({
  ...keenTheme,
});

export const widget = () => (
  <div style={{ width: '700px', height: '400px' }}>
    <BubbleChartWidget
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
      labelSelector="channel"
      valueKey="cost"
      xDomainKey="users"
      yDomainKey="conversion"
      minAreaRadius={number('Min area radius', 1, {}, 'Chart')}
      maxAreaRadius={number('Max area radius', 20, {}, 'Chart')}
      margins={object(
        'Margins',
        { top: 20, right: 20, bottom: 50, left: 40 },
        'Chart'
      )}
      theme={createThemeKnobs()}
      data={chartData}
    />
  </div>
);
