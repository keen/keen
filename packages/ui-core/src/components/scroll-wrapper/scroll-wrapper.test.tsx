import React from 'react';
import { render } from '@testing-library/react';

import ScrollWrapper from './scroll-wrapper.component';

test('renders children nodes', () => {
  const { getByTestId } = render(
    <ScrollWrapper>
      <div data-testid="children" />
    </ScrollWrapper>
  );

  expect(getByTestId('children')).toBeInTheDocument();
});
