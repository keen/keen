import * as React from 'react';
import { object, number, text } from '@storybook/addon-knobs';

import { axisXKnobs, axisYKnobs, gridKnobs } from '@keen.io/storybook-utils';

import { BubbleChart } from './bubble-chart.component';
import { chartData } from './bubble-chart.fixtures';

import { theme as keenTheme } from '../../theme';

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
      padding: '0 40px',
      width: '500px',
      height: '300px',
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
