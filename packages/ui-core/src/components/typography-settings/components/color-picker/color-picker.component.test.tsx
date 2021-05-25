import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { colors } from '@keen.io/colors';

import ColorPicker from './color-picker.component';

const render = (overProps: any = {}) => {
  const props = {
    currentColor: colors.black[300],
    onSelectColor: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<ColorPicker {...props} />);

  return {
    props,
    wrapper,
  };
};

test('allows user to select color', () => {
  const {
    props,
    wrapper: { getByTestId },
  } = render({});

  const element = getByTestId('color-indicator');
  fireEvent.click(element);

  const color = getByTestId(`color-${colors.blue[500]}`);
  fireEvent.click(color);

  expect(props.onSelectColor).toHaveBeenCalledWith(colors.blue[500]);
});
