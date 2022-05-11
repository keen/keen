import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import RangeSlider from './range-slider.component';

const render = (
  overProps: Partial<ComponentProps<typeof RangeSlider>> = {}
) => {
  const props = {
    minimum: 0,
    maximum: 10,
    colors: ['blue', 'red'],
    ...overProps,
  };

  const wrapper = rtlRender(<RangeSlider {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should render two <Control /> components', () => {
  const {
    wrapper: { getAllByTestId },
  } = render();
  const controls = getAllByTestId('slider-control');
  expect(controls.length).toEqual(2);
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

test('should show tooltip for "mouseEnter" event on minimum drag control', () => {
  const {
    wrapper: { getByText, getAllByTestId },
    props: { minimum },
  } = render();
  const marks = getAllByTestId('mark-circle');

  fireEvent.mouseEnter(marks[0]);

  expect(getByText(minimum)).toBeInTheDocument();
});

test('should show tooltip for "mouseEnter" event on maximum drag control', () => {
  const {
    wrapper: { getByText, getAllByTestId },
    props: { maximum },
  } = render();
  const marks = getAllByTestId('mark-circle');

  fireEvent.mouseEnter(marks[1]);

  expect(getByText(maximum)).toBeInTheDocument();
});
