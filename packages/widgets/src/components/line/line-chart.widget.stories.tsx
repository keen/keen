import * as React from 'react';
import { number, text } from '@storybook/addon-knobs';
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
  hoverBarKnobs,
} from '@keen.io/storybook-utils';
import { Typography } from '@keen.io/ui-core';
import { theme as keenTheme } from '@keen.io/charts';

import { timeFormat } from 'd3-time-format';

import { LineChartWidget } from './line-chart.widget';
import { chartData } from './line-chart.widget.fixtures';

import { widgetSettings } from '../../widget-settings';

export default {
  title: 'Visualizations /Line Chart / Widget',
  parameters: {
    component: LineChartWidget,
    componentSubtitle: 'Widget to be directly integrated on website',
  },
};

const createThemeKnobs = () => ({
  ...keenTheme,
  axisX: axisXKnobs('Axis X'),
  axisY: axisYKnobs('Axis Y'),
  gridX: gridKnobs('Grid X'),
  gridY: gridKnobs('Grid Y'),
  hoverBar: hoverBarKnobs('Hover bar'),
});

const createLabelFormatter = (dateFormat = '%D %b') => (date: Date) => {
  const format = timeFormat(dateFormat);
  return format(date);
};

export const widget = () => {
  const formatKnob = text('Date label format', '%d %b', 'Chart');
  return (
    <div style={{ width: '700px', height: '400px' }}>
      <LineChartWidget
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
        xAxisTitle={text('Title', 'Horizontal Title', 'Axis X Title')}
        yAxisTitle={text('Title', 'Vertical Title', 'Axis Y Title')}
        theme={createThemeKnobs()}
        data={chartData}
        tags={[{ label: 'Widget tag', variant: 'gray' }]}
      />
    </div>
  );
};
