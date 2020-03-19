import * as React from 'react';
import { text, object, number } from '@storybook/addon-knobs';
import {
  cardKnobs,
  typographyKnobs,
  colorModeKnobs,
  geoProjectionKnobs,
} from '@keen.io/storybook-utils';
import { Typography } from '@keen.io/ui-core';
import { theme as keenTheme } from '@keen.io/charts';

import { ChoroplethChartWidget } from './choropleth-chart.widget';
import { chartData } from './choropleth-chart.widget.fixtures';

import { widgetSettings } from '../../widget-settings';

export default {
  title: 'Visualizations|Choropleth Chart|Widget',
  parameters: {
    component: ChoroplethChartWidget,
    componentSubtitle: 'Widget to be directly integrated on website',
  },
};

const projectionRotateRange = {
  range: true,
  min: -360,
  max: 360,
};

const createThemeKnobs = () => ({
  ...keenTheme,
});

export const widget = () => (
  <div style={{ width: '700px', height: '400px' }}>
    <ChoroplethChartWidget
      title={{
        content: text('Title', 'Widget Title', 'Title Settings'),
        typography: typographyKnobs(
          'Title Settings',
          widgetSettings.title.typography as Typography
        ),
      }}
      subtitle={{
        content: text('Subtitle', 'Widget Subtitle', 'Subtitle Settings'),
        typography: typographyKnobs(
          'Subtitle Settings',
          widgetSettings.subtitle.typography as Typography
        ),
      }}
      card={cardKnobs('Card')}
      labelSelector="geo.country"
      geoKey="geo.country"
      valueKey="result"
      colorSteps={number('Color steps', 5, {}, 'Chart')}
      colorMode={colorModeKnobs('Chart', 'continuous') as any}
      projectionScale={number(
        'Scale',
        100,
        { range: true, min: 0, max: 500 },
        'Projection'
      )}
      projection={geoProjectionKnobs('Projection')}
      projectionTranslation={[
        number('Translate X', 0, {}, 'Projection'),
        number('Translate Y', 0, {}, 'Projection'),
      ]}
      projectionRotation={[
        number('Lambda', 0, projectionRotateRange, 'Projection'),
        number('Phi', 0, projectionRotateRange, 'Projection'),
        number('Gamma', 0, projectionRotateRange, 'Projection'),
      ]}
      margins={object(
        'Margins',
        { top: 30, right: 20, bottom: 50, left: 40 },
        'Chart'
      )}
      theme={createThemeKnobs()}
      data={chartData}
    />
  </div>
);
