import * as React from 'react';
import { object, number } from '@storybook/addon-knobs';

import { theme as defaultTheme } from '../../theme';
import { chartData } from './gauge-chart.fixtures';

import { GaugeChart } from './gauge-chart.component';

export default {
  title: 'Visualizations /Gauge Chart / Plot',
  parameters: {
    component: GaugeChart,
    componentSubtitle: 'Gauge Chart plot',
  },
};

export const plot = () => {
  const theme = {
    ...defaultTheme,
  };

  return (
    <div style={{ width: '700px', height: '400px' }}>
      <GaugeChart
        data={chartData}
        valueKey="keen.value"
        minValue={number('Minimum value', 0, {}, 'Chart')}
        maxValue={number('Maximum value', 200, {}, 'Chart')}
        theme={theme}
        formatValue={'${} $'}
        svgDimensions={object(
          'svg',
          {
            width: 700,
            height: 400,
          },
          'Chart'
        )}
        margins={object(
          'Margins',
          { top: 10, right: 10, bottom: 10, left: 10 },
          'Chart'
        )}
      />
    </div>
  );
};
