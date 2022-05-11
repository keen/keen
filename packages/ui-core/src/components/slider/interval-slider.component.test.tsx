import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import IntervalSlider from './interval-slider.component';

const render = (
  overProps: Partial<ComponentProps<typeof IntervalSlider>> = {}
) => {
  const props = {
    minimum: 0,
    maximum: 10,
    colors: ['blue', 'red'],
    intervals: [
      {
        minimum: 0,
        maximum: 100,
        step: 1,
      },
    ],
    ...overProps,
  };

  const wrapper = rtlRender(<IntervalSlider {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should show tooltip for "mouseEnter" event on drag control', () => {
  const {
    wrapper: { getByTestId, getByText },
    props: { minimum },
  } = render();
  const mark = getByTestId('mark-circle');

  fireEvent.mouseEnter(mark);

  expect(getByText(minimum)).toBeInTheDocument();
});

test('should render <Rail /> component', () => {
  const railSettings = {
    size: 10,
    borderRadius: 5,
  };

  const {
    wrapper: { getByTestId },
  } = render({ railSettings });
  const rail = getByTestId('slider-rail');

  expect(rail).toHaveStyle({
    height: `${railSettings.size}px`,
    borderRadius: `${railSettings.borderRadius}px`,
  });
});

test('should set initial value', () => {
  const initialValue = 5;
  const {
    wrapper: { getByTestId, getByText },
  } = render({ initialValue });
  const mark = getByTestId('mark-circle');

  fireEvent.mouseEnter(mark);

  expect(getByText(initialValue.toString())).toBeInTheDocument();
});
