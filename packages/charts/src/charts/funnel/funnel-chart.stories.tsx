import * as React from 'react';
import { object, boolean, color, select } from '@storybook/addon-knobs';
import { layoutKnobs, typographyKnobs } from '@keen.io/storybook-utils';
import { colors } from '@keen.io/colors';
import { Layout } from '@keen.io/ui-core';

import { FunnelChart } from './funnel-chart.component';

import { theme as keenTheme } from '../../theme';
import { Theme } from '../../types';

const chartData = [
  { name: 'Emails', value: 17000 },
  { name: 'Visits', value: 13050 },
  { name: 'Logins', value: 5900 },
  { name: 'Purchases', value: 4021 },
  { name: 'Payments', value: 2330 },
];

const createThemeKnobs = () => ({
  colors: keenTheme.colors,
  funnel: {
    step: {
      backgroundColor: color(
        'Background',
        keenTheme.funnel.step.backgroundColor,
        'Step'
      ),
    },
    header: {
      backgroundColor: color(
        'Background',
        keenTheme.funnel.header.backgroundColor,
        'Header'
      ),
      badge: {
        enabled: boolean('On / Off', true, 'Badge'),
        variant: select(
          'Color Variants',
          Object.keys(colors),
          keenTheme.funnel.header.badge.variant,
          'Badge'
        ),
        typography: typographyKnobs(
          'Badge',
          keenTheme.funnel.header.badge.typography
        ),
      },
      value: {
        enabled: boolean('On / Off', true, 'Value'),
        typography: typographyKnobs(
          'Value',
          keenTheme.funnel.header.value.typography
        ),
      },
      title: {
        typography: typographyKnobs(
          'Title',
          keenTheme.funnel.header.title.typography
        ),
      },
    },
  },
});

export default {
  title: 'Visualizations/Funnel Chart',
  parameters: {
    component: FunnelChart,
    componentSubtitle: 'Funnel Chart plot',
  },
};
export const plot = () => {
  return (
    <div
      style={{
        width: '700px',
        height: '500px',
      }}
    >
      <FunnelChart
        labelSelector="name"
        layout={layoutKnobs('Chart', 'horizontal') as Layout}
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
          { top: 0, right: 0, bottom: 0, left: 0 },
          'Chart'
        )}
        theme={createThemeKnobs() as Theme}
        data={chartData}
      />
    </div>
  );
};
