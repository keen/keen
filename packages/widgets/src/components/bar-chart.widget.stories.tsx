import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select, object } from '@storybook/addon-knobs';

import BarChartWidget from './bar-chart.widget';

import { createThemeKnobs } from '@keen/storybook-utils';
import { theme as keenTheme } from '@keen/charts';

const data = [
  { name: 'Marketing', users: 3, licenses: 52 },
  { name: 'IT', users: 19, licenses: 82 },
  { name: 'Sales', users: 20, licenses: 15 },
];

const Wrapper = styled.div`
  width: 400px;
  height: 400px;
`;

storiesOf('Widgets', module)
  .addDecorator(withKnobs)
  .add('Bar Chart', () => {
    const theme = {
      ...keenTheme,
      ...createThemeKnobs(),
    };

    return (
      <Wrapper>
        <BarChartWidget
          labelSelector="name"
          barPadding={number('Bar Padding', 0.1, {}, 'Chart')}
          keys={['users', 'licenses']}
          layout={
            select(
              'Layout',
              {
                vertical: 'vertical',
                horizontal: 'horizontal',
              },
              'vertical',
              'Chart'
            ) as any
          }
          margins={object(
            'Margins',
            { top: 50, right: 20, bottom: 50, left: 40 },
            'Chart'
          )}
          theme={theme}
          data={data}
        />
      </Wrapper>
    );
  });
