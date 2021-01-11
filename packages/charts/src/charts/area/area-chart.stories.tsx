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
} from '@keen.io/storybook-utils';

import { AreaChart } from './area-chart.component';
import { DEFAULT_MARGINS } from '../line/constants';

import { chartData } from '../line/line-chart.fixtures';

import { theme as keenTheme } from '../../theme';
import { CurveType } from '../line/types';
import { GroupMode, StackMode, Theme } from '../../types';

export default {
  title: 'Visualizations / Area Chart / Plot',
  parameters: {
    component: AreaChart,
    componentSubtitle: 'Area Chart plot',
  },
};

const createThemeKnobs = () => ({
  ...keenTheme,
  axisX: axisXKnobs('Axis X'),
  axisY: axisYKnobs('Axis Y'),
  gridX: gridKnobs('Grid X'),
  gridY: gridKnobs('Grid Y'),
});

export const plot = () => {
  const formatKnob = text('Date label format', '%d %b', 'Chart');

  const createLabelFormatter = (dateFormat = '%D %b') => (date) => {
    const format = timeFormat(dateFormat);
    return format(date);
  };

  return (
    <div style={{ width: '700px', height: '500px' }}>
      <AreaChart
        labelSelector="name"
        keys={['users', 'books', 'licenses', 'shops']}
        xScaleSettings={{
          type: 'time',
          precision: 'month',
          formatLabel: createLabelFormatter(formatKnob),
        }}
        xAxisTitle={text('Title', 'Horizontal Title', 'Axis X Title')}
        yAxisTitle={text('Title', 'Vertical Title', 'Axis Y Title')}
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
        margins={object('Margins', DEFAULT_MARGINS, 'Chart')}
        theme={createThemeKnobs() as Theme}
        data={chartData}
      />
    </div>
  );
};
