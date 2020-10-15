import * as React from 'react';
import { object, number, text } from '@storybook/addon-knobs';

import { axisXKnobs, axisYKnobs, gridKnobs } from '@keen.io/storybook-utils';

import { BubbleChart } from './bubble-chart.component';
import { DEFAULT_MARGINS } from './constants';

import { chartData } from './bubble-chart.fixtures';

import { theme as keenTheme } from '../../theme';
import { Theme } from '../../types';

export default {
  title: 'Visualizations|Bubble Chart|Plot',
  parameters: {
    component: BubbleChart,
    componentSubtitle: 'Bubble Chart plot',
  },
};

const createThemeKnobs = () => ({
  ...keenTheme,
  axisX: axisXKnobs('Axis X'),
  axisY: axisYKnobs('Axis Y'),
  gridX: gridKnobs('Grid X'),
  gridY: gridKnobs('Grid Y'),
});

export const plot = () => (
  <div
    style={{
      width: '700px',
      height: '500px',
    }}
  >
    <BubbleChart
      labelSelector="channel"
      valueKey="cost"
      xDomainKey="users"
      yDomainKey="conversion"
      minAreaRadius={number('Min area radius', 5, { min: 5, max: 40 }, 'Chart')}
      maxAreaRadius={number(
        'Max area radius',
        40,
        { min: 5, max: 40 },
        'Chart'
      )}
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
      margins={object('Margins', DEFAULT_MARGINS, 'Chart')}
      theme={createThemeKnobs() as Theme}
      data={chartData}
    />
  </div>
);
