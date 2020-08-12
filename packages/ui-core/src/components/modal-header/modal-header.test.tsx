/* eslint-disable react/no-children-prop */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ModalHeader from './modal-header.component';

test('renders children nodes', () => {
  const title = 'title';
  const { getByText } = render(<ModalHeader title={title} />);

  expect(getByText(title)).toBeInTheDocument();
});

test('renders children nodes', () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <ModalHeader title="title" onClose={mockFn} />
  );

  const closeElement = getByTestId('modal-close');
  fireEvent.click(closeElement);

  expect(mockFn).toHaveBeenCalled();
});
