import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import Confirmation from './confirmation.component';

const children = 'Description';

test('shows children and title in the component', () => {
  const title = 'Confirmation';
  render(
    <Confirmation onConfirm={jest.fn()} onCancel={jest.fn()} title={title}>
      {children}
    </Confirmation>
  );

  expect(screen.getByText(children)).toBeInTheDocument();
  expect(screen.getByText(title)).toBeInTheDocument();
});

test('shows custom text in buttons', () => {
  const confirmText = 'Yes';
  const cancelText = 'No';
  render(
    <Confirmation
      onConfirm={jest.fn()}
      onCancel={jest.fn()}
      confirmText={confirmText}
      cancelText={cancelText}
    />
  );

  expect(screen.getByText(confirmText)).toBeInTheDocument();
  expect(screen.getByText(cancelText)).toBeInTheDocument();
});

test('allows users to confirm', () => {
  const mockFn = jest.fn();
  const { container } = render(
    <Confirmation onConfirm={mockFn} onCancel={jest.fn()}>
      {children}
    </Confirmation>
  );

  const button = container.querySelector('button');
  fireEvent.click(button);

  expect(mockFn).toHaveBeenCalled();
});

test('allows users to cancel', () => {
  const mockFn = jest.fn();
  const { container } = render(
    <Confirmation onConfirm={jest.fn()} onCancel={mockFn}>
      {children}
    </Confirmation>
  );

  const button = container.querySelector('a');
  fireEvent.click(button);

  expect(mockFn).toHaveBeenCalled();
});
