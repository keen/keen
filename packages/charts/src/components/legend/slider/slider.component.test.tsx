import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';
import 'jest-styled-components';

import Slider from './slider.component';
import { Mode } from './types';

const render = (overProps: Partial<ComponentProps<typeof Slider>> = {}) => {
  const props = {
    dimension: [200, 200] as [number, number],
    mode: 'horizontal' as Mode,
    direction: 0,
    onNextSlide: jest.fn(),
    onPreviousSlide: jest.fn(),
    animation: (itemIndex) => {
      return {
        initial: {
          opacity: 0,
          x: itemIndex,
          y: '-50%',
          top: '50%',
        },
        animate: { x: itemIndex, opacity: 1 },
        exit: { x: '-50%', opacity: 0 },
      };
    },
    children: (
      <>
        <div key="1">slide #1</div>
        <div key="2">slide #2</div>
      </>
    ),
    ...overProps,
  };

  const wrapper = rtlRender(<Slider {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should render horizontal slider with 2 slides', () => {
  const {
    wrapper: { getByText },
  } = render({ mode: 'horizontal' });

  expect(getByText('slide #1')).toBeInTheDocument();
  expect(getByText('slide #2')).toBeInTheDocument();
});

test('should render vertical slider with 2 slides', () => {
  const {
    wrapper: { getByText },
  } = render({ mode: 'vertical' });

  expect(getByText('slide #1')).toBeInTheDocument();
  expect(getByText('slide #2')).toBeInTheDocument();
});
