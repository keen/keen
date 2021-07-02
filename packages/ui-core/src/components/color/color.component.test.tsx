import React from 'react';
import { fireEvent, render as rtlRender } from '@testing-library/react';
import Color from './color.component';

const render = (overProps: any = {}) => {
  const props = {
    color: 'red',
    colorSuggestions: ['blue'],
    onColorChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<Color {...props} />);

  return {
    props,
    wrapper,
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

test('click on selector should open color picker', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  const element = getByTestId('color-selector');
  fireEvent.click(element);

  expect(getByTestId('color-picker')).toBeInTheDocument();
});
