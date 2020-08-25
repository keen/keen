import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Item from './item.component';

test('renders children nodes', () => {
  const children = 'children';
  const { getByText } = render(<Item onClick={jest.fn()}>{children}</Item>);

  expect(getByText(children)).toBeInTheDocument();
});

test('calls "onClick" event handler', () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(<Item onClick={mockFn}>children</Item>);

  const element = getByTestId('dropdown-menu-item');
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalled();
});
