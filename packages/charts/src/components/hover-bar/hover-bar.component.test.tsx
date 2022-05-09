import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import HoverBar from './hover-bar.component';

import { ChartContext } from '../../contexts';

const render = (overProps: any = {}) => {
  const props = {
    x: 0,
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    ...overProps,
  };

  const context = {
    theme: {
      hoverBar: {
        type: 'dark',
      },
    },
    margins: { top: 10, bottom: 10, left: 10, right: 10 },
    svgDimensions: { width: 100, height: 100 },
  };

  const wrapper = rtlRender(
    <ChartContext.Provider value={context}>
      <svg>
        <HoverBar {...props} />
      </svg>
    </ChartContext.Provider>
  );

  return {
    wrapper,
    props,
  };
};

test('should render a "linearGradient" svg element', () => {
  const {
    wrapper: { container },
  } = render();
  const linearGradient = container.querySelector('linearGradient');

  expect(linearGradient).toBeInTheDocument();
});

test('should not render a "line" element', () => {
  const {
    wrapper: { container },
  } = render({ showLine: false });
  const line = container.querySelector('line');

  expect(line).toBeNull();
});

test('should call "onMouseEnter" handler', () => {
  const {
    wrapper: { container },
    props: { onMouseEnter },
  } = render();
  const rect = container.querySelector('rect');
  fireEvent.mouseEnter(rect);

  expect(onMouseEnter).toHaveBeenCalled();
});

test('should call "onMouseLeave" handler', () => {
  const {
    wrapper: { container },
    props: { onMouseLeave },
  } = render();
  const rect = container.querySelector('rect');
  fireEvent.mouseLeave(rect);

  expect(onMouseLeave).toHaveBeenCalled();
});
