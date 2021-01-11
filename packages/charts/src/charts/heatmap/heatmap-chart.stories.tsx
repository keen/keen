import * as React from 'react';
import { object, number, text } from '@storybook/addon-knobs';

import {
  axisXKnobs,
  axisYKnobs,
  layoutKnobs,
  colorModeKnobs,
} from '@keen.io/storybook-utils';

import Heatmap from './heatmap-chart.component';
import { DEFAULT_MARGINS } from './constants';

import { chartData } from './heatmap-chart.fixtures';

import { theme as keenTheme } from '../../theme';
import { Theme } from '../../types';

export default {
  title: 'Visualizations /Heatmap Chart / Plot',
  parameters: {
    component: Heatmap,
    componentSubtitle: 'Heatmap plot',
  },
};

const createThemeKnobs = () => ({
  ...keenTheme,
  axisX: axisXKnobs('Axis X'),
  axisY: axisYKnobs('Axis Y'),
});

export const plot = () => {
  return (
    <div style={{ width: '700px', height: '500px' }}>
      <Heatmap
        padding={number('padding', 2, {}, 'Chart')}
        layout={layoutKnobs('Chart', 'vertical') as any}
        xAxisTitle={text('Title', 'Horizontal Title', 'Axis X Title')}
        yAxisTitle={text('Title', 'Vertical Title', 'Axis Y Title')}
        colorMode={colorModeKnobs('Chart', 'continuous') as any}
        steps={number('steps', 2, {}, 'Chart')}
        labelSelector="name"
        keys={['users', 'licenses', 'shops']}
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
};
