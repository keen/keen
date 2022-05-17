import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { Position } from '@keen.io/ui-core';

import SliderButton from './slider-button.component';
import { Variant } from './types';

const render = (
  overProps: Partial<ComponentProps<typeof SliderButton>> = {}
) => {
  const props = {
    onClick: jest.fn(),
    variant: 'horizontal' as Variant,
    children: 'children',
    shadow: '',
    gradienTransformation: '',
    gradientTransmition: '',
    position: 'top' as Position,
    disabled: false,
    ...overProps,
  };

  const wrapper = rtlRender(<SliderButton {...props} />);

  return {
    props,
    wrapper,
  };
};

test('should call "onClick" handler', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const button = getByTestId('slider-button');
  fireEvent.click(button);

  expect(props.onClick).toHaveBeenCalled();
});

test('should render <Gradient /> component', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  const button = getByTestId('slider-button');
  fireEvent.mouseEnter(button);

  const gradient = getByTestId('slider-button-gradient');

  expect(gradient).toBeInTheDocument();
});
