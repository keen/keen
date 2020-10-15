import * as React from 'react';
import { text, number, boolean, select } from '@storybook/addon-knobs';
import {
  cardKnobs,
  typographyKnobs,
  layoutKnobs,
} from '@keen.io/storybook-utils';
import { Typography } from '@keen.io/ui-core';
import { theme as keenTheme } from '@keen.io/charts';
import { colors } from '@keen.io/colors';

import { BubbleChartWidget } from './bubble-chart.widget';
import { chartData } from './bubble-chart.widget.fixtures';

import { widgetSettings } from '../../widget-settings';

export default {
  title: 'Visualizations|Bubble Chart|Widget',
  parameters: {
    component: BubbleChartWidget,
    componentSubtitle: 'Widget to be directly integrated on website',
  },
};

const createThemeKnobs = () => ({
  ...keenTheme,
});

const bubbleLegendTypography = {
  fontSize: 12,
  fontFamily: 'Lato Bold',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontColor: colors.black['500'],
};

const positionOptions = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
};

const alignmentOptions = {
  left: 'left',
  center: 'center',
  right: 'right',
};

export const widget = () => (
  <div style={{ width: '700px', height: '400px' }}>
    <BubbleChartWidget
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
      legend={{
        position: select(
          'Position',
          positionOptions,
          positionOptions.left,
          'Legend'
        ) as any,
        series: {
          enabled: boolean('Enabled', true, 'Series Legend'),
          layout: layoutKnobs('Series Legend', 'vertical'),
          alignment: select(
            'Alignment',
            alignmentOptions,
            alignmentOptions.center,
            'Series Legend'
          ),
          typography: typographyKnobs('Series Legend', { fontSize: 10 }),
        },
        bubble: {
          enabled: boolean('Enabled', true, 'Bubble Legend'),
          alignment: select(
            'Alignment',
            alignmentOptions,
            alignmentOptions.right,
            'Bubble Legend'
          ),
          typography: typographyKnobs('Bubble Legend', { fontSize: 12 }),
          title: {
            value: text(
              'Title',
              'Bubble Legend Subtitle',
              'Bubble Legend Title'
            ),
            typography: typographyKnobs(
              'Bubble Legend Title',
              bubbleLegendTypography as Typography
            ),
          },
        },
      }}
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
      theme={createThemeKnobs()}
      data={chartData}
    />
  </div>
);
