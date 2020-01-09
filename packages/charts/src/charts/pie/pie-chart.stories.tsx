import * as React from 'react';
import { object } from '@storybook/addon-knobs';

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
  const theme = { colors: chartColors };
  return (
    <div style={{ padding: '0 40px', width: '700px', height: '500px' }}>
      <PieChart
        data={chartData}
        theme={theme}
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
