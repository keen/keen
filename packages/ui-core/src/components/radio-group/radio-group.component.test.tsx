import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import RadioGroup from './radio-group.component';
import { radioItems } from './radio-group.fixtures';

test('renders all radio options', () => {
  const mockFn = jest.fn();
  const { getByText } = render(
    <RadioGroup items={radioItems} onClick={mockFn} />
  );

  expect(getByText('CSV')).toBeInTheDocument();
  expect(getByText('JSON')).toBeInTheDocument();
});

test('allows user to select radio item', () => {
  const mockFn = jest.fn();
  const { getByText } = render(
    <RadioGroup items={radioItems} onClick={mockFn} />
  );

  const [firstItem] = radioItems;
  const element = getByText('CSV');
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalledWith(firstItem);
});
