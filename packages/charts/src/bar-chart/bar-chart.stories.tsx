import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
  number,
  select,
  object,
  color,
} from '@storybook/addon-knobs';

import BarChart from './bar-chart.component';

import { keenTheme, colors } from '../theme';

import { Layout } from '../types';

const chartData = [
  { name: 'Windows', users: 3, licenses: 52 },
  { name: 'MacOS', users: 19, licenses: 82 },
  { name: 'Linux', users: 20, licenses: 15 },
];

const svgDimensions = {
  width: 500,
  height: 300,
};

const options = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

const margins = { top: 50, right: 20, bottom: 50, left: 60 };

storiesOf('Charts / Components', module)
  .addDecorator(withKnobs)
  .add('BarChart - simple', () => {
    const theme = {
      ...keenTheme,
      axisX: {
        enabled: boolean('enabled', true, 'Axis X'),
        tickSize: number('tickSize', 10, {}, 'Axis X'),
        tickPadding: number('tickPadding', 10, {}, 'Axis X'),
      },
      axisY: {
        enabled: boolean('enabled', true, 'Axis Y'),
        tickSize: number('tickSize', 0, {}, 'Axis Y'),
        tickPadding: number('tickPadding', 10, {}, 'Axis Y'),
      },
      gridX: {
        enabled: boolean('enabled', true, 'Grid X'),
        color: color('color', colors.gray, 'Grid X'),
      },
      gridY: {
        enabled: boolean('enabled', true, 'Grid Y'),
        color: color('color', colors.gray, 'Grid Y'),
      },
    };

    return (
      <BarChart
        labelSelector="name"
        barPadding={number('barPadding', 0.1, {}, 'All')}
        keys={['users', 'licenses']}
        layout={select('layout', options, options.vertical, 'All') as Layout}
        svgDimensions={object('svg', svgDimensions, 'All')}
        margins={object('margins', margins, 'All')}
        theme={theme}
        data={chartData}
      />
    );
  });
