import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Radio from './radio.component';

test('do not renders active radio element', () => {
  const { queryByTestId } = render(<Radio isActive={false} />);

  expect(queryByTestId('radio-active')).not.toBeInTheDocument();
});

test('renders active radio element', () => {
  const { getByTestId } = render(<Radio isActive={true} />);

  expect(getByTestId('radio-active')).toBeInTheDocument();
});

test('calls "onClick" handler', () => {
  const mockFn = jest.fn();
  const { getByRole } = render(<Radio isActive={false} onClick={mockFn} />);

  const element = getByRole('radio');
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalled();
});
