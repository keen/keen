import React from 'react';
import { render } from '@testing-library/react';

import ContentSeparator from './content-separator.component';

test('should render children', () => {
  const text = 'lorem ipsum';
  const { getByText } = render(<ContentSeparator>{text}</ContentSeparator>);

  expect(getByText(text)).toBeInTheDocument();
});
