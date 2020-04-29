import * as React from 'react';

import { Alert } from './alert.component';

export default {
  title: 'Components|Alert',
  parameters: {
    component: Alert,
    componentSubtitle: 'Alert component for displaying message.',
  },
};

export const success = () => <Alert type="success">Success Message</Alert>;

export const error = () => <Alert type="error">Error Message</Alert>;

error.story = {
  parameters: {
    docs: {
      storyDescription: 'Displays alert with error styles.',
    },
  },
};
