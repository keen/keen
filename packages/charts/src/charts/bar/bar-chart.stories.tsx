import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object, number, select } from '@storybook/addon-knobs';

import { createThemeKnobs } from '@keen/storybook-utils';

import BarChart from './bar-chart.component';

import { theme as keenTheme } from '../../theme';
import { Layout } from '../../types';

const data = [
  { name: 'Windows', users: 3, licenses: 52, shops: 12 },
  { name: 'MacOS', users: 19, licenses: 82, shops: 15 },
  { name: 'Linux', users: 20, licenses: 15, shops: 23 },
];

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('Bar Chart', () => {
    const theme = { ...keenTheme, ...createThemeKnobs() };

    return (
      <BarChart
        labelSelector="name"
        barPadding={number('Bar Padding', 0.1, {}, 'Chart')}
        keys={['users', 'licenses', 'shops']}
        layout={
          select(
            'Layout',
            {
              vertical: 'vertical',
              horizontal: 'horizontal',
            },
            'vertical',
            'Chart'
          ) as Layout
        }
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
          { top: 50, right: 20, bottom: 50, left: 40 },
          'Chart'
        )}
        theme={theme}
        data={data}
      />
    );
  });
