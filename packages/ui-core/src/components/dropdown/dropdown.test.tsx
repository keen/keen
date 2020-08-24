import React from 'react';
import { render } from '@testing-library/react';

import Dropdown from './dropdown.component';

test('renders children nodes', () => {
  const { getByTestId } = render(
    <Dropdown isOpen>
      <div data-testid="children" />
    </Dropdown>
  );

  expect(getByTestId('children')).toBeInTheDocument();
});
