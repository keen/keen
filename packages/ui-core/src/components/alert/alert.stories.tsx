import * as React from 'react';
import { loremIpsum } from 'lorem-ipsum';
import { boolean } from '@storybook/addon-knobs';

import { Alert } from './alert.component';

export default {
  title: 'Styleguide / Alert',
  parameters: {
    component: Alert,
    componentSubtitle:
      "Provide contextual feedback messages that attracts the user's attention.",
  },
};

export const success = () => (
  <Alert type="success" contentWidth={boolean('Enable content width', false)}>
    {loremIpsum()}
  </Alert>
);

export const error = () => (
  <Alert type="error" contentWidth={boolean('Enable content width', false)}>
    {loremIpsum()}
  </Alert>
);

error.story = {
  parameters: {
    docs: {
      storyDescription: 'Displays alert with `error` message severity.',
    },
  },
};

export const info = () => (
  <Alert type="info" contentWidth={boolean('Enable content width', false)}>
    {loremIpsum()}
  </Alert>
);

info.story = {
  parameters: {
    docs: {
      storyDescription: 'Displays alert with `info` message severity.',
    },
  },
};
