import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';

import MapPath from './map-path.component';

const render = (overProps: Partial<ComponentProps<typeof MapPath>> = {}) => {
  const props = {
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
