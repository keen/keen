import * as React from 'react';
import { text, color, boolean } from '@storybook/addon-knobs';

import {
  metricTypeKnobs,
  typographyKnobs,
  metricIconKnobs,
  iconKnobs,
} from '@keen.io/storybook-utils';

import { MetricChart } from './metric-chart.component';

import { chartData } from './metric-chart.fixtures';

import { theme as keenTheme } from '../../theme';
import { Theme } from '../../types';

export default {
  title: 'Visualizations /Metric Chart / Plot',
  parameters: {
    component: MetricChart,
    componentSubtitle: 'Metric Chart plot',
  },
};

export const plot = () => {
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
    <div
      style={{
        width: '300px',
        height: '200px',
        overflow: 'hidden',
      }}
    >
      <MetricChart
        labelSelector="day"
        type={metricTypeKnobs('Chart') as any}
        usePercentDifference={
          boolean('usePercentDifference', false, 'Chart') as boolean
        }
        keys={['users']}
        theme={theme as Theme}
        data={chartData}
        formatValue={text('Format value', '${number; 0.00a}', 'Chart')}
      />
    </div>
  );
};
