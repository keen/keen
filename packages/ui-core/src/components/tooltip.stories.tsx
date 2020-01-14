import * as React from 'react';
import styled from 'styled-components';
import { boolean, number, select, color, text } from '@storybook/addon-knobs';
import { loremIpsum } from 'lorem-ipsum';

import Tooltip from './tooltip.component';
import { colors } from '@keen.io/colors';

const Wrapper = styled.div`
  width: 400px;
`;

export default {
  title: 'Components / Tooltip',
  parameters: {
    component: Tooltip,
    componentSubtitle: 'Displays customized tooltip',
  },
};

const options = {
  mode: {
    light: 'light',
    dark: 'dark',
  },
  arrowDirection: {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right',
  },
};

export const withKnobs = () => (
  <Wrapper>
    <Tooltip
      mode={select('Mode', options.mode, options.mode.light) as any}
      backgroundColor={color('Background color', colors.white['500'])}
      color={color('Color', colors.black['200'])}
      fontFamily={text('Font Family', '')}
      fontSize={number('Font Size', 10, {})}
      borderRadius={number('Border Radius', 0, {})}
      hasShadow={boolean('Enable Shadow', true)}
      arrowDirection={
        select(
          'Arrow Direction',
          options.arrowDirection,
          options.arrowDirection.top
        ) as any
      }
    >
      {loremIpsum()}
    </Tooltip>
  </Wrapper>
);
