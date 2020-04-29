import * as React from 'react';

import { Input } from './input.component';

export default {
  title: 'Components|Input',
  parameters: {
    component: Input,
    componentSubtitle: 'Displays customized card wrapper',
  },
};

export const basic = () => (
  <div style={{ width: '250px' }}>
    <Input type="text" defaultValue="keen.io" />
  </div>
);

export const error = () => (
  <div style={{ width: '250px' }}>
    <Input hasError type="text" defaultValue="keen.io" />
  </div>
);

error.story = {
  parameters: {
    docs: {
      storyDescription: 'Input with error state.',
    },
  },
};
