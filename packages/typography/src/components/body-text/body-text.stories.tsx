import * as React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
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

export const Variants = () => (
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

const component = {
  component: `
  There are three main variants of the text in the platform:
  
  - Lato Medium, 16px
    - important messages,
    - text in modals,
    - toast notifications
  
  - Lato Regular, 14px - most commonly used
    - explanations, 
    - tooltips, 
    - descriptions,
    - form elements,
    - error messages
  
  - Lato Regular, 12px
    - helpers,
    - password hints
  
  Colour depends on the use case. **Always check the contrast with the background.**
  
  Font width can also be changed to increase readability. You'll find a few use cases below.
  `,
};

Variants.story = {
  parameters: {
    docs: {
      description: {
        story: 'BodyText with variants',
        ...component,
      },
    },
  },
};

export const Body1 = () => (
  <BodyText variant="body1">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam quae ipsum
    nostrum explicabo beatae veritatis vel, numquam autem. Harum provident
    officiis libero ea omnis non odio dicta quasi quo nesciunt.
  </BodyText>
);

Body1.story = {
  parameters: {
    docs: {
      description: {
        story: 'Used for important messages.',
        ...component,
      },
    },
  },
};

export const Body2 = () => (
  <BodyText variant="body2">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam quae ipsum
    nostrum explicabo beatae veritatis vel, numquam autem. Harum provident
    officiis libero ea omnis non odio dicta quasi quo nesciunt.
  </BodyText>
);

Body2.story = {
  parameters: {
    docs: {
      description: {
        story: 'Most common variant across the platform.',
        ...component,
      },
    },
  },
};

export const Body2FormField = () => (
  <BodyText variant="body2" color={colors.blue[500]}>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam quae ipsum
    nostrum explicabo beatae veritatis vel, numquam autem. Harum provident
    officiis libero ea omnis non odio dicta quasi quo nesciunt.
  </BodyText>
);

Body2FormField.story = {
  parameters: {
    docs: {
      description: {
        story: 'Most common variant used for form fields.',
        ...component,
      },
    },
  },
};

export const Body2Label = () => (
  <BodyText variant="body2" fontWeight={600}>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam quae ipsum
    nostrum explicabo beatae veritatis vel, numquam autem. Harum provident
    officiis libero ea omnis non odio dicta quasi quo nesciunt.
  </BodyText>
);

Body2Label.story = {
  parameters: {
    docs: {
      description: {
        story: 'Most common variant used for labels.',
        ...component,
      },
    },
  },
};

export const Body2Placeholder = () => (
  <BodyText variant="body2" color={transparentize(0.5, colors.black[100])}>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam quae ipsum
    nostrum explicabo beatae veritatis vel, numquam autem. Harum provident
    officiis libero ea omnis non odio dicta quasi quo nesciunt.
  </BodyText>
);

Body2Placeholder.story = {
  parameters: {
    docs: {
      storyDescription: 'Most common variant used for placeholders.',
      ...component,
    },
  },
};

export const Body3 = () => (
  <BodyText variant="body3">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam quae ipsum
    nostrum explicabo beatae veritatis vel, numquam autem. Harum provident
    officiis libero ea omnis non odio dicta quasi quo nesciunt.
  </BodyText>
);

Body3.story = {
  parameters: {
    docs: {
      description: {
        story: 'Small text used for helpers, hints.',
        ...component,
      },
    },
  },
};
