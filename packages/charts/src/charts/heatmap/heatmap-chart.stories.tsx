import * as React from 'react';
import { object, number } from '@storybook/addon-knobs';

import { axisXKnobs, axisYKnobs, layoutKnobs } from '@keen.io/storybook-utils';

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
    <div style={{ padding: '0 40px', width: '700px', height: '500px' }}>
      <Heatmap
        padding={number('padding', 2, {}, 'Chart')}
        layout={layoutKnobs('Chart', 'vertical') as any}
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
        margins={object(
          'Margins',
          { top: 50, right: 30, bottom: 50, left: 80 },
          'Chart'
        )}
        theme={createThemeKnobs()}
        data={chartData}
      />
    </div>
  );
};
