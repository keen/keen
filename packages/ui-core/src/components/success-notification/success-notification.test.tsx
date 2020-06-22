import React from 'react';
import { render, screen } from '@testing-library/react';

import SuccessNotification from './success-notification.component';

test('shows the text when title property is passed', () => {
  const title = 'Success';
  render(<SuccessNotification>{title}</SuccessNotification>);

  expect(screen.getByText(title)).toBeInTheDocument();
});
