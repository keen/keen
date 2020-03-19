import * as React from 'react';
import { text } from '@storybook/addon-knobs';
import {
  cardKnobs,
  typographyKnobs,
  metricTypeKnobs,
} from '@keen.io/storybook-utils';
import { Typography } from '@keen.io/ui-core';
import { theme as keenTheme } from '@keen.io/charts';

import { MetricChartWidget } from './metric.widget';
import { chartData } from './metric.widget.fixtures';

import { widgetSettings } from '../../widget-settings';

export default {
  title: 'Visualizations|Metric Chart|Widget',
  parameters: {
    component: MetricChartWidget,
    componentSubtitle: 'Widget to be directly integrated on website',
  },
};

export const widget = () => (
  <div style={{ width: '300px', height: '200px' }}>
    <MetricChartWidget
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
      labelSelector="day"
      labelPrefix={text('Prefix', '', 'Chart')}
      labelSuffix={text('Suffix', '', 'Chart')}
      type={metricTypeKnobs('Chart')}
      keys={['users']}
      theme={keenTheme}
      data={chartData}
    />
  </div>
);
