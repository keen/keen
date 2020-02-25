import * as React from 'react';
import { text } from '@storybook/addon-knobs';

import { metricTypeKnobs } from '@keen.io/storybook-utils';

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
  const theme = { ...keenTheme };

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
