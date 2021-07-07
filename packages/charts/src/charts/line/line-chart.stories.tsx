import * as React from 'react';
import { object, number, text, boolean } from '@storybook/addon-knobs';
import { timeFormat } from 'd3-time-format';

import {
  axisXKnobs,
  axisYKnobs,
  gridKnobs,
  curveKnobs,
  groupModeKnobs,
  stackModeKnobs,
  hoverBarKnobs,
  themeColorsKnobs,
} from '@keen.io/storybook-utils';

import { LineChart } from './line-chart.component';
import { DEFAULT_MARGINS } from './constants';

import { chartData } from './line-chart.fixtures';

import { theme as keenTheme } from '../../theme';
import { CurveType } from './types';
import { GroupMode, StackMode, Theme } from '../../types';

export default {
  title: 'Visualizations /Line Chart / Plot',
  parameters: {
    component: LineChart,
    componentSubtitle: 'Line Chart plot',
  },
};

const createThemeKnobs = () => ({
  ...keenTheme,
  axisX: axisXKnobs('Axis X'),
  axisY: axisYKnobs('Axis Y'),
  gridX: gridKnobs('Grid X'),
  gridY: gridKnobs('Grid Y'),
  hoverBar: hoverBarKnobs('Hover bar'),
  colors: themeColorsKnobs('Theme Colors', keenTheme.colors),
  line: {
    markRadius: number('Marks radius', 4, {}, 'Chart'),
    strokeWidth: number('Line thickness', 2, {}, 'Chart'),
  },
});

export const plot = () => {
  const formatKnob = text('Date label format', '%d %b', 'Chart');

  const createLabelFormatter = (dateFormat = '%D %b') => (date) => {
    const format = timeFormat(dateFormat);
    return format(date);
  };

  return (
    <div style={{ width: '700px', height: '500px' }}>
      <LineChart
        labelSelector="name"
        keys={['users', 'books', 'licenses', 'shops']}
        xAxisTitle={text('Title', 'Horizontal Title', 'Axis X Title')}
        yAxisTitle={text('Title', 'Vertical Title', 'Axis Y Title')}
        xScaleSettings={{
          type: 'time',
          precision: 'month',
          formatLabel: createLabelFormatter(formatKnob),
        }}
        curve={curveKnobs('Chart') as CurveType}
        groupMode={groupModeKnobs('Chart') as GroupMode}
        stackMode={stackModeKnobs('Chart') as StackMode}
        gradient={boolean('Gradient mode', true, 'Chart')}
        yScaleSettings={{
          type: 'linear',
          formatLabel: text('Format pattern', '', 'Scale Settings'),
        }}
        svgDimensions={object(
          'svg',
          {
            width: 700,
            height: 500,
          },
          'Chart'
        )}
        margins={object('Margins', DEFAULT_MARGINS, 'Chart')}
        theme={createThemeKnobs() as Theme}
        data={chartData}
        tooltipSettings={{
          formatValue: text('Format tooltip', '${number; 0.00a}', 'Chart'),
        }}
      />
    </div>
  );
};
