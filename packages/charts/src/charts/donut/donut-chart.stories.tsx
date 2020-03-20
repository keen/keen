import * as React from 'react';
import { object, select, boolean, number } from '@storybook/addon-knobs';

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
        typography: typographyKnobs(
          'Total',
          defaultTheme.donut.total.typography
        ),
      },
      labels: {
        enabled: boolean('Enabled', true, 'Labels') as boolean,
        typography: typographyKnobs('Labels', defaultTheme.labels.typography),
      },
    },
  };

  const svgDimensionsKnob = object(
    'svg',
    {
      width: 700,
      height: 500,
    },
    'Chart'
  );

  const marginsKnob = object(
    'Margins',
    { top: 50, right: 20, bottom: 50, left: 40 },
    'Chart'
  );

  const getDonutRadius = () => {
    const width =
      svgDimensionsKnob.width - marginsKnob.left - marginsKnob.right;
    const height =
      svgDimensionsKnob.height - marginsKnob.top - marginsKnob.bottom;
    const min = Math.min(width, height);
    const radius = {
      min: min > 0 ? Math.round((0.3 * min) / 2) : 100,
      max: min > 0 ? Math.round((0.9 * min) / 2) : 150,
    };
    return radius;
  };

  const innerRadiusKnob = number(
    'Inner Radius',
    80,
    {
      range: true,
      min: getDonutRadius().min,
      max: getDonutRadius().max,
      step: 1,
    },
    'Chart'
  );

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
        svgDimensions={svgDimensionsKnob}
        margins={marginsKnob}
        innerRadius={innerRadiusKnob}
      />
    </div>
  );
};
