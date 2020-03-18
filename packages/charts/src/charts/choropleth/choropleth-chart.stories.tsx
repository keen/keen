import * as React from 'react';
import { object } from '@storybook/addon-knobs';

import { ChoroplethChart } from './choropleth-chart.component';

import { theme as keenTheme } from '../../theme';

import { chartData } from './choropleth-chart.fixtures';

export default {
  title: 'Visualizations|Choropleth Chart|Plot',
  parameters: {
    component: ChoroplethChart,
    componentSubtitle: 'Choropleth Chart plot',
  },
};

const createThemeKnobs = () => ({
  ...keenTheme,
});

export const plot = () => (
  <div
    style={{
      padding: '0 40px',
      width: '500px',
      height: '300px',
    }}
  >
    <ChoroplethChart
      labelSelector="geo.country"
      geoKey="geo.country"
      valueKey="result"
      steps={5}
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
        { top: 50, right: 20, bottom: 50, left: 40 },
        'Chart'
      )}
      theme={createThemeKnobs()}
      data={chartData}
    />
  </div>
);
