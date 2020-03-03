import * as React from 'react';
import { object } from '@storybook/addon-knobs';
import { layoutKnobs } from '@keen.io/storybook-utils';
import { Layout } from '@keen.io/ui-core';

import { FunnelChart } from './funnel-chart.component';

import { theme as keenTheme } from '../../theme';

const chartData = [
  { name: 'Visits', value: 130 },
  { name: 'Logins', value: 83 },
  { name: 'Purchases', value: 59 },
  { name: 'Payments', value: 13 },
];

export default {
  title: 'Charts / Funnel Chart',
  parameters: {
    component: FunnelChart,
    componentSubtitle: 'Funnel Chart plot',
  },
};
export const withKnobs = () => {
  return (
    <div
      style={{
        padding: '40px',
        width: '500px',
        height: '400px',
      }}
    >
      <FunnelChart
        labelSelector="name"
        layout={layoutKnobs('Chart') as Layout}
        svgDimensions={object(
          'svg',
          {
            width: 700,
            height: 500,
          },
          'Chart'
        )}
        margins={object(
          'Margins',
          { top: 0, right: 0, bottom: 0, left: 0 },
          'Chart'
        )}
        theme={keenTheme}
        data={chartData}
      />
    </div>
  );
};
