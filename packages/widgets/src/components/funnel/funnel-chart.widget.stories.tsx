import * as React from 'react';
import { text, color, boolean, object, select } from '@storybook/addon-knobs';
import {
  cardKnobs,
  layoutKnobs,
  typographyKnobs,
} from '@keen.io/storybook-utils';
import { colors } from '@keen.io/colors';
import { Typography, Layout } from '@keen.io/ui-core';
import { theme as keenTheme } from '@keen.io/charts';

import { FunnelChartWidget } from './funnel-chart.widget';
import { chartData } from './funnel-chart.widget.fixtures';

import { widgetSettings } from '../../widget-settings';

export default {
  title: 'Visualizations /Funnel Chart / Widget',
  parameters: {
    component: FunnelChartWidget,
    componentSubtitle: 'Widget to be directly integrated on website',
  },
};

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

export const widget = () => {
  const theme = {
    ...keenTheme,
    ...createThemeKnobs(),
  };

  return (
    <div style={{ width: '700px', height: '500px' }}>
      <FunnelChartWidget
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
        labelSelector="name"
        key="value"
        layout={layoutKnobs('Chart', 'horizontal') as Layout}
        margins={object(
          'Margins',
          { top: 30, right: 20, bottom: 50, left: 40 },
          'Chart'
        )}
        theme={theme}
        data={chartData}
        tags={[{ label: 'Widget tag', variant: 'gray' }]}
      />
    </div>
  );
};
