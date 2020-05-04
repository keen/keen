import * as React from 'react';
import { text, boolean } from '@storybook/addon-knobs';

import { PasswordValidator } from './password-validator.component';

export default {
  title: 'Components| Forms / Password Validator',
  parameters: {
    component: PasswordValidator,
    componentSubtitle: 'Displays hints for password validation.',
  },
};

export const withKnobs = () => (
  <div style={{ width: '400px' }}>
    <PasswordValidator
      password={text('Password', '')}
      touched={boolean('Touched', false)}
    />
  </div>
);
