import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import TextAlignment from './text-alignment.component';
import { TextAlignment as TextAlignmentType } from './types';

const render = (
  overProps: Partial<ComponentProps<typeof TextAlignment>> = {}
) => {
  const props = {
    currentAlignment: 'left' as TextAlignmentType,
    onUpdateTextAlignment: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<TextAlignment {...props} />);

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
test('allows user to edit text alignment', () => {
  const {
    props,
    wrapper: { getByTestId },
  } = render({});

  const element = getByTestId('text-alignment-header');
  fireEvent.click(element);

  const option = getByTestId('option-center');
  fireEvent.click(option);

  expect(props.onUpdateTextAlignment).toHaveBeenCalledWith('center');
});
