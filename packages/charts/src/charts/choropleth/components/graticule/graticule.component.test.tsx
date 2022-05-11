import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { GeoPath, GeoPermissibleObjects, GeoGraticuleGenerator } from 'd3-geo';

import Graticule from './graticule.component';

const render = (overProps: Partial<ComponentProps<typeof Graticule>> = {}) => {
  const props = {
    draw: (jest
      .fn()
      .mockImplementation((coordinates) => coordinates) as unknown) as GeoPath<
      any,
      GeoPermissibleObjects
    >,
    graticule: (jest
      .fn()
      .mockImplementation(
        () => '@graticule-value'
      ) as unknown) as GeoGraticuleGenerator,
    stroke: 'black',
    ...overProps,
  };

  const wrapper = rtlRender(
    <svg>
      <Graticule {...props} />
    </svg>
  );

  return {
    wrapper,
    props,
  };
};

test('renders svg "path" element', () => {
  const {
    wrapper: { container },
  } = render();

  expect(container.querySelector('path')).toBeInTheDocument();
});

test('calls "graticule" generator handler', () => {
  const { props } = render();

  expect(props.graticule).toHaveBeenCalled();
});

test('calls "draw" handler and set path property', () => {
  const graticuleValue = '@graticule-value';
  const {
    props,
    wrapper: { container },
  } = render();

  const path = container.querySelector('path');

  expect(props.draw).toHaveBeenCalledWith(graticuleValue);
  expect(path).toHaveAttribute('d', graticuleValue);
});

test('set "stroke" for path element', () => {
  const {
    wrapper: { container },
    props,
  } = render();
  const path = container.querySelector('path');

  expect(path).toHaveAttribute('stroke', props.stroke);
});
