import * as React from 'react';
import { object, number, text } from '@storybook/addon-knobs';
import { timeFormat } from 'd3-time-format';

import { createThemeKnobs } from '@keen.io/storybook-utils';

import { LineChart } from './line-chart.component';
import { chartData } from './line-chart.fixtures';

import { theme as keenTheme } from '../../theme';

export default {
  title: 'Charts / Line Chart',
  parameters: {
    component: LineChart,
    componentSubtitle: 'Line Chart plot',
  },
};

export const withKnobs = () => {
  const theme = { ...keenTheme, ...createThemeKnobs() };

  const formatKnob = text('Date label format', '%b, %Y', 'Chart');

  const createLabelFormatter = (dateFormat = '%b, %Y') => date => {
    const format = timeFormat(dateFormat);
    return format(date);
  };

  return (
    <div style={{ padding: '0 40px', width: '700px', height: '500px' }}>
      <LineChart
        labelSelector="name"
        keys={['users', 'licenses', 'shops', 'books']}
        markRadius={number('Marks radius', 4, {}, 'Chart')}
        strokeWidth={number('Line thickness', 2, {}, 'Chart')}
        formatLabelHorizontal={createLabelFormatter(formatKnob)}
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
          { top: 50, right: 30, bottom: 50, left: 40 },
          'Chart'
        )}
        theme={theme}
        data={chartData}
      />
    </div>
  );
};
