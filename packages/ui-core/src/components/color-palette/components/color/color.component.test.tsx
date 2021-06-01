import React from 'react';
import { fireEvent, render as rtlRender } from '@testing-library/react';
import { Color } from './index';

const testColor = '#00ff00';
const render = (overProps: any = {}) => {
  const props = {
    color: testColor,
    isDragged: false,
    onDelete: jest.fn(),
    toggleColorPicker: jest.fn(),
    activeColorPicker: null,
    onColorChange: jest.fn(),
    colorSuggestions: [test],
    ...overProps,
  };

  const wrapper = rtlRender(<Color {...props} />);

  return {
    wrapper,
    props,
  };
};

test('Should show color picker when active color is the same as current color', () => {
  const {
    wrapper: { getByTestId },
  } = render({
    activeColorPicker: testColor,
  });
  const colorPicker = getByTestId('dynamic-portal');
  expect(colorPicker).toBeInTheDocument();
});

test('Should not show color picker when active color is different than current color', () => {
  const {
    wrapper: { queryByTestId },
  } = render({
    activeColorPicker: '#0000ff',
  });
  const colorPicker = queryByTestId('dynamic-portal');
  expect(colorPicker).not.toBeInTheDocument();
});

test('Should call onDelete function when color is deleted', () => {
  const mockFn = jest.fn();

  const {
    wrapper: { queryByTestId },
  } = render({
    onDelete: mockFn,
  });
  const colorElement = queryByTestId('color');
  fireEvent.mouseOver(colorElement);

  const deleteButton = queryByTestId('delete-button');
  fireEvent.click(deleteButton);
  expect(mockFn).toBeCalledWith(testColor);
});

test('Should show drag handle on color hover', () => {
  const mockFn = jest.fn();

  const {
    wrapper: { queryByTestId },
  } = render({
    onDelete: mockFn,
  });
  const colorElement = queryByTestId('color');
  fireEvent.mouseOver(colorElement);

  const dragHandle = queryByTestId('drag-handle');

  expect(dragHandle).toBeInTheDocument();
});

test('Should call toggle color picker on color click', () => {
  const mockFn = jest.fn();

  const {
    wrapper: { queryByTestId },
  } = render({
    toggleColorPicker: mockFn,
  });

  const colorElement = queryByTestId('color');
  fireEvent.click(colorElement);

  expect(mockFn).toBeCalledWith(testColor);
});
