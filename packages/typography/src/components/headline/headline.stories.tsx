import * as React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { select, text, boolean } from '@storybook/addon-knobs';
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
  max-width: 100%;
`;

export const Variants = () => (
  <Container>
    <Wrapper>
      <Headline
        variant={select('Variant', variantOptions, 'h1')}
        lineHeight={text('Line height', '120%')}
        fontWeight={select('Font weight', fontWeightOptions, 400)}
        color={text('Color', colors.black[500])}
        isTextOverflow={boolean('Text overflow', false)}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam
        eveniet, assumenda, quo beatae fugit vero magni minima vel voluptatem
        aspernatur corporis fuga ratione molestias doloribus animi illo nemo,
        saepe atque.
      </Headline>
    </Wrapper>
  </Container>
);

const component = {
  component: `
Headlines in Keen:

- **Gangster Grotesk Bold**, 36px
- **Gangster Grotesk Bold**, 30px  
  Use for:
  - Signup pages
  - Marketing pages
- **Gangster Grotesk Bold**, 20px  
  Titles of the pages
- **Gangster Grotesk Bold**, 16px  
  Small titles
  `,
};

Variants.story = {
  parameters: {
    docs: {
      description: {
        story: 'Headline with variants',
        ...component,
      },
    },
  },
};

export const H1Headline = () => (
  <Headline variant="h1">
    Lorem ipsum dolor sit amet consectetur adipisicing elit
  </Headline>
);

H1Headline.story = {
  parameters: {
    docs: {
      description: {
        story: 'Used for headlines on marketing pages',
        ...component,
      },
    },
  },
};

export const H2Headline = () => (
  <Headline variant="h2">
    Lorem ipsum dolor sit amet consectetur adipisicing elit
  </Headline>
);

H2Headline.story = {
  parameters: {
    docs: {
      description: {
        story: 'Used for headlines on Signup pages',
        ...component,
      },
    },
  },
};

export const H3Headline = () => (
  <Headline variant="h3">
    Lorem ipsum dolor sit amet consectetur adipisicing elit
  </Headline>
);

H3Headline.story = {
  parameters: {
    docs: {
      description: {
        story: 'Used for titles and headlines in the application',
        ...component,
      },
    },
  },
};

export const H3PageTitle = () => (
  <Headline variant="h3" color={colors.black[400]}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit
  </Headline>
);

H3PageTitle.story = {
  parameters: {
    docs: {
      description: {
        story: 'Used for page titles, query names, dashboard names',
        ...component,
      },
    },
  },
};

export const H3ModalTitle = () => (
  <Headline variant="h3" color={colors.blue[500]}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit
  </Headline>
);

H3ModalTitle.story = {
  parameters: {
    docs: {
      description: {
        story: 'Used for modal titles',
        ...component,
      },
    },
  },
};

export const H3EmptyStateTitleBlue = () => (
  <Headline variant="h3" color={colors.blue[500]} fontWeight={400}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit
  </Headline>
);

H3EmptyStateTitleBlue.story = {
  parameters: {
    docs: {
      description: {
        story:
          'Used for empty states for different views (No queries yet, No dashboards yet), loading states, it can be a link',
        ...component,
      },
    },
  },
};

export const H3EmptyStateTitleGreen = () => (
  <Headline variant="h3" color={colors.green[500]} fontWeight={400}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit
  </Headline>
);

H3EmptyStateTitleGreen.story = {
  parameters: {
    docs: {
      description: {
        story:
          'Used for empty states for different views (No queries yet, No dashboards yet), loading states, it can be a link',
        ...component,
      },
    },
  },
};

export const H3PageTitlePlaceholder = () => (
  <Headline variant="h3" color={transparentize(0.5, colors.black[400])}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit
  </Headline>
);

H3PageTitlePlaceholder.story = {
  parameters: {
    docs: {
      description: {
        story: 'Used for New query, Untitled dashboard',
        ...component,
      },
    },
  },
};

export const H4SmallTitle = () => (
  <Headline variant="h4">
    Lorem ipsum dolor sit amet consectetur adipisicing elit
  </Headline>
);

H4SmallTitle.story = {
  parameters: {
    docs: {
      description: {
        story: 'Used for Saved Queries table titles, Dashboard titles on tiles',
        ...component,
      },
    },
  },
};
