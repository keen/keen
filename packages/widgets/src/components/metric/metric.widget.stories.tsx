import * as React from 'react';
import { text, color } from '@storybook/addon-knobs';
import {
  cardKnobs,
  typographyKnobs,
  metricTypeKnobs,
  metricIconKnobs,
  iconKnobs,
} from '@keen.io/storybook-utils';
import { theme as keenTheme } from '@keen.io/charts';
import { Typography } from '@keen.io/ui-core';

import { MetricChartWidget } from './metric.widget';
import { chartData } from './metric.widget.fixtures';

import { widgetSettings } from '../../widget-settings';

export default {
  title: 'Visualizations /Metric Chart / Widget',
  parameters: {
    component: MetricChartWidget,
    componentSubtitle: 'Widget to be directly integrated on website',
  },
};

export const widget = () => {
  const theme = {
    ...keenTheme,
    metric: {
      value: {
        typography: typographyKnobs('Value', keenTheme.metric.value.typography),
      },
      icon: metricIconKnobs('Icon'),
      excerpt: {
        icons: {
          increase: {
            color: color(
              'Color',
              keenTheme.metric.excerpt.icons.increase.color,
              'Increase'
            ),
            type: iconKnobs(
              'Increase',
              keenTheme.metric.excerpt.icons.increase.type
            ),
          },
          decrease: {
            color: color(
              'Color',
              keenTheme.metric.excerpt.icons.increase.color,
              'Decrease'
            ),
            type: iconKnobs(
              'Decrease',
              keenTheme.metric.excerpt.icons.decrease.type
            ),
          },
        },
        backgroundColor: color(
          'Background',
          keenTheme.metric.excerpt.backgroundColor,
          'Excerpt'
        ),
        typography: typographyKnobs(
          'Excerpt',
          keenTheme.metric.excerpt.typography
        ),
      },
    },
  };

  return (
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
        type={metricTypeKnobs('Chart')}
        keys={['users']}
        theme={theme}
        data={chartData}
        tags={[{ label: 'Widget tag', variant: 'gray' }]}
      />
    </div>
  );
};
