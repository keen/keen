import * as React from 'react';
import { text, object, number, boolean, select } from '@storybook/addon-knobs';
import { cardKnobs, typographyKnobs } from '@keen.io/storybook-utils';
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

const legendTypography = {
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
        enabled: boolean('Enabled', true, 'Legend'),
        position: select(
          'Position',
          positionOptions,
          positionOptions.left,
          'Legend'
        ) as any,
        alignment: select(
          'Alignment',
          alignmentOptions,
          alignmentOptions.right,
          'Legend'
        ),
        typography: typographyKnobs('Legend', { fontSize: 10 }),
      }}
      legendTitle={{
        content: text('Title', 'Legend Subtitle', 'Legend Title'),
        typography: typographyKnobs(
          'Legend Title',
          legendTypography as Typography
        ),
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
      margins={object(
        'Margins',
        { top: 20, right: 20, bottom: 50, left: 40 },
        'Chart'
      )}
      theme={createThemeKnobs()}
      data={chartData}
    />
  </div>
);
