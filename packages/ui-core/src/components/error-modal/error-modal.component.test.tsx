import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import ErrorModal from './error-modal.component';

const children = 'Description';

test('shows children and title in the component', () => {
  const title = 'Error';
  render(
    <ErrorModal onCancel={jest.fn()} title={title}>
      {children}
    </ErrorModal>
  );

  expect(screen.getByText(children)).toBeInTheDocument();
  expect(screen.getByText(title)).toBeInTheDocument();
});

test('shows custom text in buttons', () => {
  const cancelText = 'No';
  render(<ErrorModal onCancel={jest.fn()} cancelText={cancelText} />);

  expect(screen.getByText(cancelText)).toBeInTheDocument();
});

test('allows users to cancel', () => {
  const mockFn = jest.fn();
  const { container } = render(
    <ErrorModal onCancel={mockFn}>{children}</ErrorModal>
  );

  const button = container.querySelector('a');
  fireEvent.click(button);

  expect(mockFn).toHaveBeenCalled();
});
