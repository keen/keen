import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import PasswordInput from './password-input.component';

it('should render "password" input HTML element', () => {
  const { container } = render(<PasswordInput />);

  expect(container.querySelector('input').type).toEqual('password');
});

it('should change input element type to "text"', () => {
  const { container } = render(<PasswordInput />);
  const icon = container.querySelector('svg');
  const input = container.querySelector('input');

  fireEvent.click(icon);

  expect(input.type).toEqual('text');
});
