/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { object, number } from '@storybook/addon-knobs';

import {
  geoProjectionKnobs,
  colorModeKnobs,
  themeColorsKnobs,
} from '@keen.io/storybook-utils';

import { ChoroplethChart } from './choropleth-chart.component';
import { Projection } from './types';

import { theme as keenTheme } from '../../theme';

import { fetchMapTopology } from './utils';
import { chartData } from './choropleth-chart.fixtures';

export default {
  title: 'Visualizations /Choropleth Chart / Plot',
  parameters: {
    component: ChoroplethChart,
    componentSubtitle: 'Choropleth Chart plot',
  },
};

const createThemeKnobs = () => ({
  ...keenTheme,
  colors: themeColorsKnobs('Theme Colors', keenTheme.colors),
});

const projectionRotateRange = {
  range: true,
  min: -360,
  max: 360,
};

export const plot = () => {
  const [topology, setTopology] = React.useState(null);
  React.useEffect(() => {
    fetchMapTopology('world').then((mapTopology) => {
      setTopology(mapTopology);
    });
  }, []);

  if (!topology) return null;

  return (
    <div
      style={{
        width: '600px',
        height: '300px',
      }}
    >
      <ChoroplethChart
        labelSelector="geo.country"
        geoKey="geo.country"
        valueKey="result"
        colorSteps={number('Color steps', 5, {}, 'Chart')}
        colorMode={colorModeKnobs('Chart', 'continuous') as any}
        topology={topology}
        projectionScale={number(
          'Scale',
          100,
          { range: true, min: 0, max: 500 },
          'Projection'
        )}
        projection={geoProjectionKnobs('Projection') as Projection}
        projectionTranslation={[
          number('Translate X', 0, {}, 'Projection'),
          number('Translate Y', 0, {}, 'Projection'),
        ]}
        projectionRotation={[
          number('Lambda', 0, projectionRotateRange, 'Projection'),
          number('Phi', 0, projectionRotateRange, 'Projection'),
          number('Gamma', 0, projectionRotateRange, 'Projection'),
        ]}
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
          { top: 50, right: 20, bottom: 50, left: 40 },
          'Chart'
        )}
        theme={createThemeKnobs()}
        data={chartData}
      />
    </div>
  );
};
