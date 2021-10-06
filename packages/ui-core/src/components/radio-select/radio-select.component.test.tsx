import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import RadioSelect from './radio-select.component';
import { radioItems } from './radio-select.fixtures';
import { KEYBOARD_KEYS } from '../../constants';

test('renders all radio select options', () => {
  const mockFn = jest.fn();
  const { getByText } = render(
    <RadioSelect items={radioItems} onClick={mockFn} />
  );

  radioItems.forEach((item) =>
    expect(getByText(item.label)).toBeInTheDocument()
  );
});

test('allows user to select an item', () => {
  const mockFn = jest.fn();
  const { getByText } = render(
    <RadioSelect items={radioItems} onClick={mockFn} />
  );

  const [firstItem] = radioItems;
  const element = getByText(firstItem.label);
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalledWith(firstItem);
});

test('allows user to select an item by using keyboard', () => {
  const mockFn = jest.fn();
  const { getByText } = render(
    <RadioSelect items={radioItems} onClick={mockFn} />
  );

  const [firstItem] = radioItems;
  const element = getByText(firstItem.label);
  fireEvent.keyDown(element, { key: 'Enter', keyCode: KEYBOARD_KEYS.ENTER });

  expect(mockFn).toHaveBeenCalledWith(firstItem);
});
