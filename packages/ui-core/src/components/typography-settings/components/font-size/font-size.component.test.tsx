import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import FontSize from './font-size.component';

const render = (overProps: Partial<ComponentProps<typeof FontSize>> = {}) => {
  const props = {
    currentFontSize: 18,
    fontSizeSuggestions: [14, 15, 18],
    onUpdateFontSize: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<FontSize {...props} />);

  return {
    props,
    wrapper,
  };
};

beforeEach(() => {
  Element.prototype.getBoundingClientRect = jest
    .fn()
    .mockImplementation(() => ({
      x: 0,
      y: 0,
      height: 10,
    }));
});

test('renders current font size', () => {
  const {
    props,
    wrapper: { getByText },
  } = render({});

  expect(getByText(props.currentFontSize)).toBeInTheDocument();
});

test('allows user to edit font size', () => {
  const {
    props,
    wrapper: { getByTestId, getByText },
  } = render({});
  const fontSize = 14;

  const element = getByTestId('font-size-header');
  fireEvent.click(element);

  const option = getByText(fontSize.toString());
  fireEvent.click(option);

  expect(props.onUpdateFontSize).toHaveBeenCalledWith(fontSize);
});
