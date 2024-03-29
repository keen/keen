import * as React from 'react';
import { object, select, boolean, number, text } from '@storybook/addon-knobs';

import { typographyKnobs, themeColorsKnobs } from '@keen.io/storybook-utils';

import { theme as defaultTheme } from '../../theme';

import { DonutChart } from './donut-chart.component';

import { chartData } from './donut-chart.fixtures';

export default {
  title: 'Visualizations /Donut Chart / Plot',
  parameters: {
    component: DonutChart,
    componentSubtitle: 'Donut Chart plot',
  },
};

export const plot = () => {
  const theme = {
    ...defaultTheme,
    colors: themeColorsKnobs('Theme Colors', defaultTheme.colors),
    donut: {
      total: {
        enabled: boolean('Enabled', true, 'Total') as boolean,
        label: {
          typography: typographyKnobs(
            'Total Label',
            defaultTheme.donut.total.label.typography
          ),
        },
        value: {
          typography: typographyKnobs(
            'Total Value',
            defaultTheme.donut.total.value.typography
          ),
        },
      },
      labels: {
        enabled: boolean('Enabled', true, 'Labels') as boolean,
        typography: typographyKnobs(
          'Labels',
          defaultTheme.donut.labels.typography
        ),
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

  const innerRadiusKnob = number(
    'Inner Radius',
    0.7,
    {
      range: true,
      min: 0.1,
      max: 0.95,
      step: 0.01,
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
        valueMode={select(
          'Value mode',
          { percentage: 'percentage', numeric: 'numeric' },
          'percentage',
          'Chart'
        )}
        svgDimensions={svgDimensionsKnob}
        margins={marginsKnob}
        innerRadius={innerRadiusKnob}
        tooltipSettings={{
          formatValue: text('Format tooltip', '${number; 0.00a}', 'Chart'),
        }}
      />
    </div>
  );
};
