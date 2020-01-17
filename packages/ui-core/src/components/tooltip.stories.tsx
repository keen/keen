import * as React from 'react';
import styled from 'styled-components';
import { boolean, select, color, text } from '@storybook/addon-knobs';
import { loremIpsum } from 'lorem-ipsum';

import Tooltip, { TooltipMode } from './tooltip.component';
import BulletList from './bulletlist.component';
import { typographyKnobs } from '@keen.io/storybook-utils';
import { colors } from '@keen.io/colors';
import { Position } from '../types';

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
    none: 'none',
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

const bulletList = [
  {
    color: 'red',
    value: 'red',
  },
  {
    color: 'blue',
    value: 'blue',
  },
  {
    color: 'green',
    value: 'green',
  },
  {
    color: 'black',
    value: 'black',
  },
];

export const withKnobs = () => (
  <Wrapper>
    <Tooltip
      mode={
        select('Mode', options.mode, options.mode.light, 'Mode') as TooltipMode
      }
      backgroundColor={color(
        'Background color',
        colors.white['500'],
        'Tooltip'
      )}
      borderRadius={text('Border Radius', '0px', 'Tooltip')}
      hasShadow={boolean('Shadow On / Off', true, 'Tooltip')}
      arrowDirection={
        select(
          'Arrow Direction',
          options.arrowDirection,
          options.arrowDirection.top,
          'Tooltip'
        ) as Position
      }
      {...typographyKnobs('Tooltip', {}, ['fontStyle', 'fontWeight'])}
    >
      {loremIpsum()}
    </Tooltip>
  </Wrapper>
);

export const LightMode = () => (
  <Wrapper>
    <Tooltip>Light mode</Tooltip>
  </Wrapper>
);

LightMode.story = {
  parameters: {
    docs: {
      storyDesciption: 'Tooltip displayed in `light mode`',
    },
  },
};

export const DarkMode = () => (
  <Wrapper>
    <Tooltip mode="dark">Dark mode</Tooltip>
  </Wrapper>
);

DarkMode.story = {
  parameters: {
    docs: {
      storyDesciption: 'Tooltip displayed in `dark mode`',
    },
  },
};

export const BulletPoints = () => (
  <Wrapper>
    <Tooltip>
      <BulletList list={bulletList} />
    </Tooltip>
  </Wrapper>
);

BulletPoints.story = {
  parameters: {
    docs: {
      storyDesciption: 'Tooltip with bullet points',
    },
  },
};
