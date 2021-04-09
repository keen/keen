import * as React from 'react';
import { Icon } from '@keen.io/icons';
import { action } from '@storybook/addon-actions';

import { Button } from './button.component';
import { boolean } from '@storybook/addon-knobs';

export default {
  title: 'Styleguide / Button',
  parameters: {
    component: Button,
    componentSubtitle: 'Displays a customized button component',
  },
};

export const primary = () => <Button onClick={action('click')}>Button</Button>;

export const primaryLarge = () => (
  <Button onClick={action('click')} size="large">
    Large Button
  </Button>
);

export const primarySmall = () => (
  <Button onClick={action('click')} size="small">
    Small Button
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
  <Button
    onClick={action('click')}
    variant="secondary"
    isDisabled={boolean('Is disabled', true)}
  >
    Button
  </Button>
);

export const secondarySmall = () => (
  <Button onClick={action('click')} variant="secondary" size="small">
    Button
  </Button>
);

export const successOutline = () => (
  <Button onClick={action('click')} variant="success" style="outline">
    Button
  </Button>
);

export const successSolid = () => (
  <Button onClick={action('click')} variant="success">
    Button
  </Button>
);

export const dangerOutline = () => (
  <Button onClick={action('click')} variant="danger" style="outline">
    Button
  </Button>
);

export const dangerSolid = () => (
  <Button onClick={action('click')} variant="danger" style="solid">
    Button
  </Button>
);

export const blankSolid = () => (
  <Button onClick={action('click')} variant="blank" style="solid">
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
