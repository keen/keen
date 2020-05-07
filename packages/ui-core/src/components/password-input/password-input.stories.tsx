import * as React from 'react';

import { PasswordInput } from './password-input.component';

export default {
  title: 'Components| Forms / Password Input',
  parameters: {
    component: PasswordInput,
    componentSubtitle: 'Input dedicated for password',
  },
};

export const basic = () => (
  <div style={{ width: '250px' }}>
    <PasswordInput defaultValue="keen.io" />
  </div>
);
