import React from 'react';
import { render } from '@testing-library/react';

import PasswordValidator from './password-validator.component';

import { passwordValidators } from './validators';

test('should render validators', () => {
  const password = '';
  const { container } = render(
    <PasswordValidator password={password} touched={false} />
  );
  const validators = container.querySelectorAll('li');

  expect(validators.length).toEqual(passwordValidators.length);
});
