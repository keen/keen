import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import SliderButton from './slider-button.component';

const render = (overProps: any = {}) => {
  const props = {
    ...overProps,
    onClick: jest.fn(),
    variant: 'horizontal',
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
