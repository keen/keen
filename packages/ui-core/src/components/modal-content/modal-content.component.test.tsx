import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import ModalContent from './modal-content.component';

const children = 'Description';

test('shows children in the component', () => {
  render(
    <ModalContent onConfirm={jest.fn()} onCancel={jest.fn()}>
      {children}
    </ModalContent>
  );

  expect(screen.getByText(children)).toBeInTheDocument();
});

test('shows custom text in buttons', () => {
  const confirmText = 'Yes';
  const cancelText = 'No';
  render(
    <ModalContent
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
    <ModalContent onConfirm={mockFn} onCancel={jest.fn()}>
      {children}
    </ModalContent>
  );

  const button = container.querySelector('button');
  fireEvent.click(button);

  expect(mockFn).toHaveBeenCalled();
});

test('allows users to cancel', () => {
  const mockFn = jest.fn();
  const { container } = render(
    <ModalContent onConfirm={jest.fn()} onCancel={mockFn}>
      {children}
    </ModalContent>
  );

  const button = container.querySelector('a');
  fireEvent.click(button);

  expect(mockFn).toHaveBeenCalled();
});
