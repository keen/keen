import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
  number,
  select,
  object,
} from '@storybook/addon-knobs';

import BarChart from './bar-chart.component';
import { LayoutType } from './bar-chart.utils';

import { keenTheme } from '../theme';

const chartData = [
  { name: 'Windows', users: 3, licenses: 12 },
  { name: 'MacOS', users: 19, licenses: 20 },
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
        tickSize: number('tickSize', 10, {}, 'Axis Y'),
        tickPadding: number('tickPadding', 10, {}, 'Axis Y'),
      },
    };

    return (
      <BarChart
        labelSelector="name"
        barPadding={number('barPadding', 0.1, {}, 'All')}
        keys={['users', 'licenses']}
        layout={
          select('layout', options, options.vertical, 'All') as LayoutType
        }
        svgDimensions={object('svg', svgDimensions, 'All')}
        margins={object('margins', margins, 'All')}
        theme={theme}
        data={chartData}
      />
    );
  });
