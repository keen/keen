import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { GeoPath, GeoPermissibleObjects } from 'd3-geo';

import Sphere from './sphere.component';

const render = (overProps: Partial<ComponentProps<typeof Sphere>> = {}) => {
  const props = {
    draw: jest.fn() as unknown as GeoPath<any, GeoPermissibleObjects>,
    background: 'black',
    ...overProps,
  };

  const wrapper = rtlRender(
    <svg>
      <Sphere {...props} />
    </svg>
  );

  return {
    wrapper,
    props,
  };
};

test('set "fill" attribute for path element', () => {
  const {
    wrapper: { container },
    props,
  } = render();
  const path = container.querySelector('path');

  expect(path).toHaveAttribute('fill', props.background);
});

test('calls "draw" handler with "Sphere" type', () => {
  const { props } = render();

  expect(props.draw).toHaveBeenCalledWith({ type: 'Sphere' });
});
