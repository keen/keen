import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import RadioSelect from './radio-select.component';
import { radioItems } from './radio-select.fixtures';

test('renders all radio select options', () => {
  const mockFn = jest.fn();
  const { getByText } = render(
    <RadioSelect items={radioItems} onClick={mockFn} />
  );

  radioItems.forEach((item) =>
    expect(getByText(item.label)).toBeInTheDocument()
  );
});

test('allows user to select item', () => {
  const mockFn = jest.fn();
  const { getByText } = render(
    <RadioSelect items={radioItems} onClick={mockFn} />
  );

  const [firstItem] = radioItems;
  const element = getByText(radioItems[0].label);
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalledWith(firstItem);
});
