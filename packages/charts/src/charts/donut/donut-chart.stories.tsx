import * as React from 'react';
import { object, select, boolean } from '@storybook/addon-knobs';

import { typographyKnobs } from '@keen.io/storybook-utils';

import { theme as defaultTheme } from '../../theme';

import { DonutChart } from './donut-chart.component';

import { chartData } from './donut-chart.fixtures';

export default {
  title: 'Visualizations|Donut Chart|Plot',
  parameters: {
    component: DonutChart,
    componentSubtitle: 'Donut Chart plot',
  },
};

export const plot = () => {
  const theme = {
    ...defaultTheme,
    donut: {
      total: {
        enabled: boolean('Enabled', true, 'Total') as boolean,
        typography: typographyKnobs('Total'),
      },
      labels: {
        enabled: boolean('Enabled', true, 'Labels') as boolean,
        typography: typographyKnobs('Labels'),
      },
    },
  };

  return (
    <div style={{ width: '700px', height: '500px' }}>
      <DonutChart
        data={chartData}
        theme={theme}
        keys={['buy', 'sold']}
        labelsAutocolor={boolean('Autocolor', true, 'Chart')}
        labelsPosition={select(
          'Labels Position',
          { inside: 'inside', outside: 'outside' },
          'inside',
          'Chart'
        )}
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
          { top: 50, right: 20, bottom: 50, left: 40 },
          'Chart'
        )}
      />
    </div>
  );
};
