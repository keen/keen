import * as React from 'react';
import styled from 'styled-components';

import { cardKnobs } from '@keen.io/storybook-utils';

import { loremIpsum } from 'lorem-ipsum';

import Card from './card.component';

const Wrapper = styled.div`
  width: 400px;
`;

export default {
  title: 'Components /Card',
  parameters: {
    component: Card,
    componentSubtitle: 'Displays customized card wrapper',
  },
};

export const withKnobs = () => (
  <Wrapper>
    <Card {...cardKnobs('Card')}>{loremIpsum()}</Card>
  </Wrapper>
);
