import * as React from 'react';
import { Icon } from '@keen.io/icons';
import { action } from '@storybook/addon-actions';

import { Button } from './button.component';

export default {
  title: 'Components|Button',
  parameters: {
    component: Button,
    componentSubtitle: 'Displays customized button',
  },
};

export const primary = () => <Button onClick={action('click')}>Button</Button>;

export const primaryLarge = () => (
  <Button onClick={action('click')} size="large">
    Large Button
  </Button>
);

primaryLarge.story = {
  parameters: {
    docs: {
      storyDescription: 'Displays button with increased size.',
    },
  },
};

export const primaryButtonLink = () => (
  <Button href="https://keen.io" onClick={action('click')}>
    Link
  </Button>
);

primaryButtonLink.story = {
  parameters: {
    docs: {
      storyDescription: 'Displays button as `anchor` HTML element.',
    },
  },
};

export const secondary = () => (
  <Button onClick={action('click')} variant="secondary">
    Button
  </Button>
);

export const secondaryWithIcon = () => (
  <Button
    onClick={action('click')}
    variant="secondary"
    icon={<Icon type="button-arrow" width={32} height={32} />}
  >
    Button
  </Button>
);

secondaryWithIcon.story = {
  parameters: {
    docs: {
      storyDescription: 'Displays button with `<Icon />` component.',
    },
  },
};

export const secondaryButtonLink = () => (
  <Button href="https://keen.io" onClick={action('click')} variant="secondary">
    Link
  </Button>
);
