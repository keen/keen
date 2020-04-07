import * as React from 'react';
import { object, number, text, boolean } from '@storybook/addon-knobs';
import { timeFormat } from 'd3-time-format';

import {
  axisXKnobs,
  axisYKnobs,
  xAxisTitleKnobs,
  yAxisTitleKnobs,
  axisTitleThemeKnobs,
  gridKnobs,
  curveKnobs,
  groupModeKnobs,
  stackModeKnobs,
} from '@keen.io/storybook-utils';

import { LineChart } from './line-chart.component';
import { chartData } from './line-chart.fixtures';

import { theme as keenTheme } from '../../theme';
import { CurveType } from './types';
import { GroupMode, StackMode } from '../../types';

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
  axisTitle: axisTitleThemeKnobs('Axis Title'),
});

export const plot = () => {
  const formatKnob = text('Date label format', '%d %b', 'Chart');

  const createLabelFormatter = (dateFormat = '%D %b') => date => {
    const format = timeFormat(dateFormat);
    return format(date);
  };

  return (
    <div style={{ padding: '0 40px', width: '700px', height: '500px' }}>
      <LineChart
        labelSelector="name"
        keys={['users', 'books', 'licenses', 'shops']}
        xAxisTitle={xAxisTitleKnobs('Axis Title')}
        yAxisTitle={yAxisTitleKnobs('Axis Title')}
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
        theme={createThemeKnobs()}
        data={chartData}
      />
    </div>
  );
};
