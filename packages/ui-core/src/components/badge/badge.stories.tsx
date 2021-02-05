import * as React from 'react';
import styled from 'styled-components';
import { select, boolean } from '@storybook/addon-knobs';
import { colors } from '@keen.io/colors';

import { Badge } from './badge.component';
import { Variant } from './types';

export default {
  title: 'Styleguide / Badge',
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
        truncate={boolean('Truncate', true, 'Badge')}
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

variants.story = {
  parameters: {
    docs: {
      storyDescription: 'Badge with color variants',
    },
  },
};

export const truncated = () => (
  <Container>
    <Wrapper>
      <Badge
        removable
        truncate={boolean('Truncate', true, 'Badge')}
        variant={
          select(
            'Color Variants',
            Object.keys(colors),
            'purple',
            'Badge'
          ) as Variant
        }
      >
        This is a very very long text
      </Badge>
    </Wrapper>
  </Container>
);

truncated.story = {
  parameters: {
    docs: {
      storyDescription: 'Badge with label truncation',
    },
  },
};
