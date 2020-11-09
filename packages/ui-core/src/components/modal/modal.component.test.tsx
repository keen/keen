/* eslint-disable react/no-children-prop */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Modal from './modal.component';

test('renders children nodes', () => {
  const children = 'content';
  const { getByText } = render(
    <Modal isOpen={true}>{() => <div>{children}</div>}</Modal>
  );

  expect(getByText(children)).toBeInTheDocument();
});

test('renders fade mask', () => {
  const children = 'content';
  const { getByTestId } = render(
    <Modal isOpen={true}>{() => <div>{children}</div>}</Modal>
  );

  expect(getByTestId('fade-mask')).toBeInTheDocument();
});

test('allows user to close modal by pressing "ESC" key', () => {
  const children = 'content';
  const mockFn = jest.fn();

  const { getByTestId } = render(
    <Modal isOpen={true} onClose={mockFn} blockScrollOnOpen>
      {() => <div>{children}</div>}
    </Modal>
  );

  const element = getByTestId('modal-container');
  fireEvent.keyDown(element, { keyCode: 27 });

  expect(mockFn).toHaveBeenCalled();
});
