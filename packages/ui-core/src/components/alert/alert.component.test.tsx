import React from 'react';
import { render } from '@testing-library/react';

import Alert from './alert.component';

test('renders children nodes', () => {
  const children = 'message';
  const { getByText } = render(<Alert type="error">{children}</Alert>);

  expect(getByText(children)).toBeInTheDocument();
});
