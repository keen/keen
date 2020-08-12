import * as React from 'react';

import { Label } from './label.component';

export default {
  title: 'Components|Label',
  parameters: {
    component: Label,
    componentSubtitle: 'Displays label for form HTML input elements.',
  },
};

export const basic = () => <Label>Label</Label>;

export const secondary = () => <Label variant="secondary">Label</Label>;

secondary.story = {
  parameters: {
    docs: {
      storyDescription: 'Label used in platform.',
    },
  },
};

export const error = () => <Label hasError>Error</Label>;

error.story = {
  parameters: {
    docs: {
      storyDescription: 'Label with error state.',
    },
  },
};

export const disabled = () => <Label disabled>Disabled</Label>;

disabled.story = {
  parameters: {
    docs: {
      storyDescription: 'Label with disabled state.',
    },
  },
};
