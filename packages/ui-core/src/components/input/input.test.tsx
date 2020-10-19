import React from 'react';
import { render } from '@testing-library/react';

import Input from './input.component';

test('renders HTML input element', () => {
  const { container } = render(<Input />);

  expect(container.querySelector('input')).toBeInTheDocument();
});

test('renders "prefix" elements', () => {
  const { getByTestId } = render(<Input renderPrefix={() => <div />} />);

  expect(getByTestId('input-prefix')).toBeInTheDocument();
});

test('renders "suffix" elements', () => {
  const { getByTestId } = render(<Input renderSuffix={() => <div />} />);

  expect(getByTestId('input-suffix')).toBeInTheDocument();
});
