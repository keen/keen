import * as React from 'react';
import { number, text, object, boolean } from '@storybook/addon-knobs';
import {
  cardKnobs,
  axisXKnobs,
  axisYKnobs,
  gridKnobs,
  typographyKnobs,
  legendKnobs,
  curveKnobs,
  groupModeKnobs,
  lineStackModeKnobs,
} from '@keen.io/storybook-utils';
import { Typography } from '@keen.io/ui-core';
import { theme as keenTheme } from '@keen.io/charts';

import { timeFormat } from 'd3-time-format';

import { AreaChartWidget } from './area-chart.widget';
import { chartData } from './area-chart.widget.fixtures';

import { widgetSettings } from '../../widget-settings';

export default {
  title: 'Visualizations|Area Chart|Widget',
  parameters: {
    component: AreaChartWidget,
    componentSubtitle: 'Widget to be directly integrated on website',
  },
};

const createThemeKnobs = () => ({
  ...keenTheme,
  axisX: axisXKnobs('Axis X'),
  axisY: axisYKnobs('Axis Y'),
  gridX: gridKnobs('Grid X'),
  gridY: gridKnobs('Grid Y'),
});

const createLabelFormatter = (dateFormat = '%D %b') => (date: Date) => {
  const format = timeFormat(dateFormat);
  return format(date);
};

export const widget = () => {
  const formatKnob = text('Date label format', '%d %b', 'Chart');

  return (
    <div style={{ width: '700px', height: '400px' }}>
      <AreaChartWidget
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
        legend={legendKnobs('Legend') as any}
        labelSelector="name"
        keys={['users', 'books', 'licenses', 'shops']}
        xScaleSettings={{
          type: 'time',
          precision: 'month',
          formatLabel: createLabelFormatter(formatKnob),
        }}
        markRadius={number('Marks radius', 4, {}, 'Chart')}
        strokeWidth={number('Line thickness', 2, {}, 'Chart')}
        curve={curveKnobs('Chart') as CurveType}
        groupMode={groupModeKnobs('Chart') as GroupMode}
        stackMode={lineStackModeKnobs('Chart') as StackMode}
        gradient={boolean('Gradient mode', true, 'Chart')}
        xAxisTitle={text('Title', 'Horizontal Title', 'Axis X Title')}
        yAxisTitle={text('Title', 'Vertical Title', 'Axis Y Title')}
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
};
