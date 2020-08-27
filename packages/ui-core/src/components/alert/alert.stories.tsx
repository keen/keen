import * as React from 'react';
import { loremIpsum } from 'lorem-ipsum';

import { Alert } from './alert.component';

export default {
  title: 'Styleguide | Alert',
  parameters: {
    component: Alert,
    componentSubtitle:
      "Provide contextual feedback messages that attracts the user's attention.",
  },
};

export const success = () => <Alert type="success">{loremIpsum()}</Alert>;

export const error = () => <Alert type="error">{loremIpsum()}</Alert>;

error.story = {
  parameters: {
    docs: {
      storyDescription: 'Displays alert with `error` message severity.',
    },
  },
};

export const info = () => <Alert type="info">{loremIpsum()}</Alert>;

info.story = {
  parameters: {
    docs: {
      storyDescription: 'Displays alert with `info` message severity.',
    },
  },
};
