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
  width: 700,
  height: 500,
};

const typhographyOptions = {
  fontStyle: {
    normal: 'normal',
    italic: 'italic',
  },
  fontWeight: {
    normal: 'normal',
    bold: 'bold',
  },
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
        enabled: boolean('Enabled', true, 'Axis X'),
        tickSize: number('Tick Size', 10, {}, 'Axis X'),
        tickPadding: number('Tick Padding', 10, {}, 'Axis X'),
        color: color('Line Color', colors.darkBlue, 'Axis X'),
        labels: {
          enabled: boolean('Show Labels', true, 'Axis X'),
          typhography: {
            fontSize: number('Font Size', 10, {}, 'Axis X'),
            fontStyle: select(
              'Font Style',
              typhographyOptions.fontStyle,
              typhographyOptions.fontStyle.normal,
              'Axis X'
            ) as any,
            fontWeight: select(
              'Font Weight',
              typhographyOptions.fontWeight,
              typhographyOptions.fontWeight.normal,
              'Axis X'
            ) as any,
            fontColor: color('Color', colors.black, 'Axis X'),
          },
        },
      },
      axisY: {
        enabled: boolean('Enabled', true, 'Axis Y'),
        tickSize: number('Tick Size', 10, {}, 'Axis Y'),
        tickPadding: number('Tick Padding', 10, {}, 'Axis Y'),
        color: color('Line Color', colors.darkBlue, 'Axis Y'),
        labels: {
          enabled: boolean('Show Labels', true, 'Axis Y'),
          typhography: {
            fontSize: number('Font Size', 10, {}, 'Axis Y'),
            fontStyle: select(
              'Font Style',
              typhographyOptions.fontStyle,
              typhographyOptions.fontStyle.normal,
              'Axis Y'
            ) as any,
            fontWeight: select(
              'Font Weight',
              typhographyOptions.fontWeight,
              typhographyOptions.fontWeight.normal,
              'Axis Y'
            ) as any,
            fontColor: color('Color', colors.black, 'Axis Y'),
          },
        },
      },
      gridX: {
        enabled: boolean('Enabled', true, 'Grid X'),
        color: color('Color', colors.gray, 'Grid X'),
      },
      gridY: {
        enabled: boolean('Enabled', true, 'Grid Y'),
        color: color('Color', colors.gray, 'Grid Y'),
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
        barPadding={number('Bar Padding', 0.1, {}, 'Chart')}
        keys={['users', 'licenses']}
        layout={select('Layout', options, options.vertical, 'Chart') as Layout}
        svgDimensions={object('svg', svgDimensions, 'Chart')}
        margins={object('Margins', margins, 'Chart')}
        theme={theme}
        data={chartData}
      />
    );
  });
