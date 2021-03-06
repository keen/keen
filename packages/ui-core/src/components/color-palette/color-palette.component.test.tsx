import React from 'react';
import { fireEvent, render as rtlRender } from '@testing-library/react';
import { ColorPalette } from '../index';

const render = (overProps: any = {}) => {
  const props = {
    colors: ['red', 'green', 'blue'],
    onColorsChange: jest.fn(),
    colorSuggestions: [],
    ...overProps,
  };

  const wrapper = rtlRender(<ColorPalette {...props} />);

  return {
    wrapper,
    props,
  };
};

beforeEach(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn();
  Element.prototype.getBoundingClientRect = jest
    .fn()
    .mockImplementation(() => ({
      x: 1,
      y: 1,
      height: 100,
    }));
});

test('Should render all colors', () => {
  const {
    wrapper: { getAllByTestId },
  } = render();
  const elements = getAllByTestId('color');
  expect(elements.length).toEqual(3);
});

test('Should show color picker component on add color button click', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  const addColorButton = getByTestId('add-color-button');
  fireEvent.click(addColorButton);

  const colorPickerComponent = getByTestId('color-picker');
  expect(colorPickerComponent).toBeInTheDocument();
});
