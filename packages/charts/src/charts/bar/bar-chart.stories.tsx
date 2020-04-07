import * as React from 'react';
import { object, number, boolean } from '@storybook/addon-knobs';

import {
  axisXKnobs,
  axisYKnobs,
  xAxisTitleKnobs,
  yAxisTitleKnobs,
  axisTitleThemeKnobs,
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
  axisTitle: axisTitleThemeKnobs('Axis Title'),
  bar: {
    values: {
      typography: typographyKnobs('Values', keenTheme.bar.values.typography),
    },
  },
});

export const plot = () => (
  <div
    style={{
      padding: '0 40px',
      width: '500px',
      height: '300px',
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
      xAxisTitle={xAxisTitleKnobs('Axis Title')}
      yAxisTitle={yAxisTitleKnobs('Axis Title')}
      svgDimensions={object(
        'svg',
        {
          width: 500,
          height: 300,
        },
        'Chart'
      )}
      margins={object(
        'Margins',
        { top: 50, right: 20, bottom: 60, left: 60 },
        'Chart'
      )}
      theme={createThemeKnobs()}
      data={chartData}
    />
  </div>
);
