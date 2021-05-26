import React from 'react';
import { fireEvent, render as rtlRender } from '@testing-library/react';
import { ColorPicker } from '../index';

const render = (overProps: any = {}) => {
  const props = {
    color: '#EAEAEA',
    onClosePicker: jest.fn(),
    onColorChange: jest.fn(),
    colorSuggestions: [],
    ...overProps,
  };

  const wrapper = rtlRender(<ColorPicker {...props} />);

  return {
    wrapper,
    props,
  };
};

test('Should call onColorChange function on color save', () => {
  const mockFn = jest.fn();
  const mockColor = '#00ff00';
  const {
    wrapper: { getByText },
  } = render({
    onColorChange: mockFn,
    color: mockColor,
  });
  const saveButton = getByText('Save');
  fireEvent.click(saveButton);
  expect(mockFn).toHaveBeenCalledWith(mockColor);
});

test('Should call onClosePicker function on picker close', () => {
  const mockFn = jest.fn();
  const {
    wrapper: { getByText },
  } = render({
    onClosePicker: mockFn,
  });
  const cancelButton = getByText('Cancel');
  fireEvent.click(cancelButton);
  expect(mockFn).toHaveBeenCalled();
});
