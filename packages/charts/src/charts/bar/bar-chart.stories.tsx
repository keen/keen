import * as React from 'react';
import { object, number } from '@storybook/addon-knobs';

import { createThemeKnobs, createLayoutKnobs } from '@keen.io/storybook-utils';

import { BarChart } from './bar-chart.component';
import { chartData } from './bar-chart.fixtures';

import { theme as keenTheme } from '../../theme';

export default {
  title: 'Charts / Bar Chart',
  parameters: {
    component: BarChart,
    componentSubtitle: 'Bar Chart plot',
  },
};

export const withKnobs = () => {
  const theme = { ...keenTheme, ...createThemeKnobs() };

  return (
    <div
      style={{
        padding: '0 40px',
        width: '700px',
        height: '500px',
      }}
    >
      <BarChart
        labelSelector="name"
        barPadding={number('Bar Padding', 0.1, {}, 'Chart')}
        keys={['users', 'licenses', 'shops']}
        layout={createLayoutKnobs('Chart', 'vertical') as any}
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
        theme={theme}
        data={chartData}
      />
    </div>
  );
};
