import * as React from 'react';

import { Button } from './button.component';

export default {
  title: 'Components|Button',
  parameters: {
    component: Button,
    componentSubtitle: 'Displays customized button',
  },
};

export const primary = () => (
  <Button onClick={() => console.log('sa')}>Hello World!</Button>
);

export const primaryButtonLink = () => (
  <Button href="https://keen.io" onClick={() => console.log('sa')}>
    Hello World!
  </Button>
);
