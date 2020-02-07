import * as React from 'react';
import { object, select, boolean } from '@storybook/addon-knobs';

import { typographyKnobs } from '@keen.io/storybook-utils';

import { chartColors } from '../../theme';

import { PieChart } from './pie-chart.component';

import { chartData } from './pie-chart.fixtures';

export default {
  title: 'Charts / Pie Chart',
  parameters: {
    component: PieChart,
    componentSubtitle: 'Pie Chart plot',
  },
};

export const withKnobs = () => {
  const theme = {
    colors: chartColors,
    labels: {
      enabled: boolean('Enabled', true, 'Labels') as boolean,
      typography: typographyKnobs('Labels'),
    },
  };

  return (
    <div style={{ width: '700px', height: '500px' }}>
      <PieChart
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
