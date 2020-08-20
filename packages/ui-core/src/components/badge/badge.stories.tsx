import * as React from 'react';
import styled from 'styled-components';
import { select } from '@storybook/addon-knobs';
import { colors } from '@keen.io/colors';

import { Badge } from './badge.component';

import { Variant } from './types';

export default {
  title: 'Components|Badge',
  parameters: {
    component: Badge,
    componentSubtitle: 'Displays simple badge with color variants support',
  },
};

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  padding: 6px;
`;

export const variants = () => (
  <Container>
    <Wrapper>
      <Badge
        removable
        variant={
          select(
            'Color Variants',
            Object.keys(colors),
            'purple',
            'Badge'
          ) as Variant
        }
      >
        Badge
      </Badge>
    </Wrapper>
  </Container>
);
