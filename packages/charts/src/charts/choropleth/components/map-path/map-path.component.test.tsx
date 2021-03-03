import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import MapPath from './map-path.component';

const render = (overProps: any = {}) => {
  const props = {
    onMouseEnter: jest.fn(),
    onMouseMove: jest.fn(),
    onMouseLeave: jest.fn(),
    path: 'path',
    fill: 'blue',
    strokeWidth: '0.5',
    stroke: 'black',
    ...overProps,
  };

  const wrapper = rtlRender(
    <svg>
      <MapPath {...props} />
    </svg>
  );

  return {
    props,
    wrapper,
  };
};

test('calls "onMouseEnter" handler', () => {
  const {
    wrapper: { container },
    props,
  } = render();

  const path = container.querySelector('path');
  fireEvent.mouseEnter(path);

  expect(props.onMouseEnter).toHaveBeenCalled();
});

test('calls "onMouseLeave" handler', () => {
  const {
    wrapper: { container },
    props,
  } = render();

  const path = container.querySelector('path');
  fireEvent.mouseLeave(path);

  expect(props.onMouseLeave).toHaveBeenCalled();
});

test('calls "onMouseEnter" handler', () => {
  const {
    wrapper: { container },
    props,
  } = render();

  const path = container.querySelector('path');
  fireEvent.mouseMove(path);

  expect(props.onMouseMove).toHaveBeenCalled();
});

test('set "stroke" attribute for path element', () => {
  const {
    wrapper: { container },
    props,
  } = render();
  const path = container.querySelector('path');

  expect(path).toHaveAttribute('stroke', props.stroke);
});

test('set "fill" attribute for path element', () => {
  const {
    wrapper: { container },
    props,
  } = render();
  const path = container.querySelector('path');

  expect(path).toHaveAttribute('fill', props.fill);
});

test('set "d" attribute for path element', () => {
  const {
    wrapper: { container },
    props,
  } = render();
  const path = container.querySelector('path');

  expect(path).toHaveAttribute('d', props.path);
});
