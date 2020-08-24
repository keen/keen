import React from 'react';
import { render } from '@testing-library/react';

import Card from './card.component';

test('renders children nodes', () => {
  const children = 'content';
  const { getByText } = render(<Card>{children}</Card>);

  expect(getByText(children)).toBeInTheDocument();
});
