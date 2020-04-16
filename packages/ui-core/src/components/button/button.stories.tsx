import * as React from 'react';
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
