import * as React from 'react';
import styled from 'styled-components';
import { select, text } from '@storybook/addon-knobs';
import { colors } from '@keen.io/colors';

import Headline from './headline.component';
import { Variant } from './types';
import { FontWeight } from '../../types';

export default {
  title: 'Typography / Headline',
  parameters: {
    component: Headline,
    componentSubtitle: 'Displays text for headline',
  },
};

const fontWeightOptions: FontWeight[] = [
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  'normal',
  'lighter',
  'bold',
  'bolder',
];
const variantOptions: Variant[] = ['h1', 'h2', 'h3', 'h4'];

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  padding: 6px;
`;

export const variants = () => (
  <Container>
    <Wrapper>
      <Headline
        variant={select('Variant', variantOptions, 'h1')}
        lineHeight={text('Line Height', '120%')}
        fontWeight={select('Font weight', fontWeightOptions, 400)}
        color={text('Color', colors.black[500])}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit
      </Headline>
    </Wrapper>
  </Container>
);

variants.story = {
  parameters: {
    docs: {
      storyDescription: 'Headline with variants',
    },
  },
};
