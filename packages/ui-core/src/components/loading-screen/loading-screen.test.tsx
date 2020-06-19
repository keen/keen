import React from 'react';
import { render, screen } from '@testing-library/react';

import LoadingScreen from './loading-screen.component';

test('shows the text when title property is passed', () => {
  const title = 'Title';
  render(<LoadingScreen title={title} />);

  expect(screen.getByText(title)).toBeInTheDocument();
});
