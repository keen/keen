import React from 'react';
import { render } from '@testing-library/react';

import Label from './label.component';

test('renders children nodes', () => {
  const children = 'login';
  const { getByText } = render(<Label>{children}</Label>);

  expect(getByText(children)).toBeInTheDocument();
});

test('renders asterisk indicator', () => {
  const { getByText } = render(<Label showAsterisk>label</Label>);

  expect(getByText('*')).toBeInTheDocument();
});
