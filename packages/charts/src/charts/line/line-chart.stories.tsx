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
} from '@keen.io/storybook-utils';

import { LineChart } from './line-chart.component';
import { chartData } from './line-chart.fixtures';

import { theme as keenTheme } from '../../theme';
import { CurveType } from './types';
import { GroupMode, StackMode, Theme } from '../../types';

export default {
  title: 'Visualizations|Line Chart|Plot',
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
});

export const plot = () => {
  const formatKnob = text('Date label format', '%d %b', 'Chart');

  const createLabelFormatter = (dateFormat = '%D %b') => date => {
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
        markRadius={number('Marks radius', 4, {}, 'Chart')}
        strokeWidth={number('Line thickness', 2, {}, 'Chart')}
        curve={curveKnobs('Chart') as CurveType}
        groupMode={groupModeKnobs('Chart') as GroupMode}
        stackMode={stackModeKnobs('Chart') as StackMode}
        gradient={boolean('Gradient mode', true, 'Chart')}
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
          { top: 50, right: 30, bottom: 60, left: 60 },
          'Chart'
        )}
        theme={createThemeKnobs() as Theme}
        data={chartData}
      />
    </div>
  );
};
