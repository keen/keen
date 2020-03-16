import * as React from 'react';
import { object, number } from '@storybook/addon-knobs';

import {
  axisXKnobs,
  axisYKnobs,
  layoutKnobs,
  colorModeKnobs,
} from '@keen.io/storybook-utils';

import Heatmap from './heatmap-chart.component';
import { chartData } from './heatmap-chart.fixtures';

import { theme as keenTheme } from '../../theme';

export default {
  title: 'Visualizations|Heatmap Chart|Plot',
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
    <div style={{ width: '600px', height: '300px' }}>
      <Heatmap
        padding={number('padding', 2, {}, 'Chart')}
        layout={layoutKnobs('Chart', 'vertical') as any}
        colorMode={colorModeKnobs('Chart', 'continuous') as any}
        steps={number('steps', 2, {}, 'Chart')}
        labelSelector="name"
        keys={['users', 'licenses', 'shops']}
        svgDimensions={object(
          'svg',
          {
            width: 600,
            height: 300,
          },
          'Chart'
        )}
        margins={object(
          'Margins',
          { top: 20, right: 30, bottom: 50, left: 80 },
          'Chart'
        )}
        theme={createThemeKnobs()}
        data={chartData}
      />
    </div>
  );
};
