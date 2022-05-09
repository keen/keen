import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import Mark from './mark.component';

const render = (overProps: any = {}) => {
  const props = {
    size: 10,
    backgroundColor: 'black',
    borderColor: 'gray',
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    ...overProps,
  } as any;

  const wrapper = rtlRender(<Mark {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should call "onMouseEnter" handler', () => {
  const {
    wrapper: { getByTestId },
    props: { onMouseEnter },
  } = render();
  const circle = getByTestId('mark-circle');
  fireEvent.mouseEnter(circle);

  expect(onMouseEnter).toHaveBeenCalled();
});

test('should call "onMouseLeave" handler', () => {
  const {
    wrapper: { getByTestId },
    props: { onMouseLeave },
  } = render();
  const circle = getByTestId('mark-circle');
  fireEvent.mouseLeave(circle);

  expect(onMouseLeave).toHaveBeenCalled();
});

test('should set element dimension based on "size" property', () => {
  const {
    wrapper: { getByTestId },
    props: { size },
  } = render();
  const circle = getByTestId('mark-circle');
  const circleSize = circle.getAttribute('size');

  expect(circleSize).toEqual(`${size}`);
});
