import * as React from 'react';
import { number, object } from '@storybook/addon-knobs';

import { BarChartWidget } from './bar-chart.widget';
import { chartData } from './bar-chart.widget.fixtures';

import {
  createThemeKnobs,
  createLayoutKnobs,
  createLegendKnobs,
} from '@keen.io/storybook-utils';
import { theme as keenTheme } from '@keen.io/charts';

export default {
  title: 'Widgets / Bar Chart Widget',
  parameters: {
    component: BarChartWidget,
    componentSubtitle: 'Widget to be directly integrated on website',
  },
};

export const withKnobs = () => {
  const theme = {
    ...keenTheme,
    ...createThemeKnobs(),
  };

  return (
    <div style={{ width: '700px', height: '400px' }}>
      <BarChartWidget
        legend={createLegendKnobs('Legend') as any}
        labelSelector="name"
        barPadding={number('Bar Padding', 0.1, {}, 'Chart')}
        keys={['people', 'licenses', 'cars', 'documents']}
        layout={createLayoutKnobs('Chart') as any}
        margins={object(
          'Margins',
          { top: 30, right: 20, bottom: 50, left: 40 },
          'Chart'
        )}
        theme={theme}
        data={chartData}
      />
    </div>
  );
};
