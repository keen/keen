import * as React from 'react';
import { text, color } from '@storybook/addon-knobs';

import {
  metricTypeKnobs,
  typographyKnobs,
  iconKnobs,
} from '@keen.io/storybook-utils';

import { MetricChart } from './metric-chart.component';

import { chartData } from './metric-chart.fixtures';

import { theme as keenTheme } from '../../theme';

export default {
  title: 'Charts / Metric Chart',
  parameters: {
    component: MetricChart,
    componentSubtitle: 'Metric Chart plot',
  },
};

export const withKnobs = () => {
  const theme = {
    ...keenTheme,
    metric: {
      label: {
        typography: typographyKnobs(
          'Metric',
          keenTheme.metric.label.typography
        ),
      },
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
        padding: '0 10px',
        width: '200px',
        height: '200px',
      }}
    >
      <MetricChart
        labelSelector="day"
        labelPrefix={text('Prefix', '', 'Chart')}
        labelSuffix={text('Suffix', '', 'Chart')}
        type={metricTypeKnobs('Chart')}
        keys={['users']}
        theme={theme}
        data={chartData}
      />
    </div>
  );
};
