import * as React from 'react';
import styled from 'styled-components';
import { select, text } from '@storybook/addon-knobs';
import { colors } from '@keen.io/colors';

import BodyText from './body-text.component';
import { Variant } from './types';
import { FontWeight } from '../../types';

export default {
  title: 'Typography / BodyText',
  parameters: {
    component: BodyText,
    componentSubtitle: 'Displays text for body',
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
const variantOptions: Variant[] = ['body1', 'body2', 'body3'];

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  padding: 6px;
`;

export const variants = () => (
  <Container>
    <Wrapper>
      <BodyText
        variant={select('Variant', variantOptions, 'body1')}
        lineHeight={text('Line Height', '120%')}
        fontWeight={select('Font weight', fontWeightOptions, 400)}
        color={text('Color', colors.black[500])}
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam quae
        ipsum nostrum explicabo beatae veritatis vel, numquam autem. Harum
        provident officiis libero ea omnis non odio dicta quasi quo nesciunt.
      </BodyText>
    </Wrapper>
  </Container>
);

variants.story = {
  parameters: {
    docs: {
      storyDescription: 'BodyText with variants',
    },
  },
};
