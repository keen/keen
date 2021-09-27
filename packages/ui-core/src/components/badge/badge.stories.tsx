import * as React from 'react';
import styled from 'styled-components';
import { select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
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
        onClick={() => action('Click')}
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

export const truncatedProgrammatical = () => (
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
        onClick={action('Click')}
      >
        This is a very very long text
      </Badge>
    </Wrapper>
  </Container>
);

truncatedProgrammatical.story = {
  parameters: {
    docs: {
      storyDescription: 'Badge with label truncation',
    },
  },
};

const CSSWrapper = styled.div`
  padding: 6px;
  max-width: 120px;
`;

export const truncatedCSS = () => (
  <Container>
    <CSSWrapper>
      <Badge
        removable
        truncate={boolean('Truncate', true, 'Badge')}
        truncateMethod="css"
        variant={
          select(
            'Color Variants',
            Object.keys(colors),
            'purple',
            'Badge'
          ) as Variant
        }
        onClick={action('Click')}
      >
        This is a very very long text
      </Badge>
    </CSSWrapper>
  </Container>
);

truncatedCSS.story = {
  parameters: {
    docs: {
      storyDescription: 'Badge with label truncation',
    },
  },
};

export const differentContent = () => (
  <Container>
    <CSSWrapper>
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
        onClick={action('Click')}
      >
        <span>Bagde nr</span> 345
      </Badge>
    </CSSWrapper>
  </Container>
);

differentContent.story = {
  parameters: {
    docs: {
      storyDescription: 'Badge with label truncation',
    },
  },
};
