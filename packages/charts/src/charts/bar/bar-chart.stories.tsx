import * as React from 'react';
import { object, number, boolean, text } from '@storybook/addon-knobs';

import {
  axisXKnobs,
  axisYKnobs,
  gridKnobs,
  stackModeKnobs,
  groupModeKnobs,
  layoutKnobs,
  typographyKnobs,
} from '@keen.io/storybook-utils';
import { BarChart } from './bar-chart.component';
import { chartData } from './bar-chart.fixtures';

import { theme as keenTheme } from '../../theme';

import { GroupMode, StackMode } from '../../types';

export default {
  title: 'Visualizations|Bar Chart|Plot',
  parameters: {
    component: BarChart,
    componentSubtitle: 'Bar Chart plot',
  },
};

const createThemeKnobs = () => ({
  ...keenTheme,
  axisX: axisXKnobs('Axis X'),
  axisY: axisYKnobs('Axis Y'),
  gridX: gridKnobs('Grid X'),
  gridY: gridKnobs('Grid Y'),
  bar: {
    values: {
      typography: typographyKnobs('Values', keenTheme.bar.values.typography),
    },
  },
});

export const plot = () => (
  <div
    style={{
      width: '700px',
      height: '500px',
    }}
  >
    <BarChart
      labelSelector="name"
      groupMode={groupModeKnobs('Chart') as GroupMode}
      stackMode={stackModeKnobs('Chart') as StackMode}
      barPadding={number('Bar Padding', 0.1, {}, 'Chart')}
      showValues={boolean('Show Values', false, 'Chart')}
      valuesAutocolor={boolean('Autocolor Values', true, 'Chart')}
      keys={['users', 'licenses', 'shops']}
      layout={layoutKnobs('Chart', 'vertical') as any}
      xAxisTitle={text('Title', 'Horizontal Title', 'Axis X Title')}
      yAxisTitle={text('Title', 'Vertical Title', 'Axis Y Title')}
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
        { top: 50, right: 20, bottom: 60, left: 100 },
        'Chart'
      )}
      theme={createThemeKnobs()}
      data={chartData}
    />
  </div>
);
