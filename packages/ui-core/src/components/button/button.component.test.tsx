import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from './button.component';

test('renders children nodes', () => {
  const children = 'Sign up';
  const { getByText } = render(<Button>{children}</Button>);

  expect(getByText(children)).toBeInTheDocument();
});

test('renders HTML anchor element', () => {
  const { container } = render(<Button href="https://keen.io">Button</Button>);

  expect(container.querySelector('a')).toBeInTheDocument();
});

test('renders "button" element with proper htmlType', () => {
  const { getByTestId } = render(<Button htmlType="reset">Button</Button>);

  expect(getByTestId('button')).toHaveAttribute('type', 'reset');
});

test('renders "button" with icon', () => {
  const { getByText } = render(<Button icon={<i>icon</i>}>Button</Button>);

  expect(getByText('icon')).toBeInTheDocument();
});

test('calls "onClick" event handler', () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(<Button onClick={mockFn}>Button</Button>);

  const element = getByTestId('button');
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalled();
});

test('do not calls "onClick" handler for disabled state', () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <Button isDisabled onClick={mockFn}>
      Button
    </Button>
  );

  const element = getByTestId('button');
  fireEvent.click(element);

  expect(mockFn).not.toHaveBeenCalled();
});
