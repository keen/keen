import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import 'jest-styled-components';

import ColorScale from './color-scale.component';

const render = (overProps: any = {}) => {
  const props = {
    ...overProps,
  } as any;

  const wrapper = rtlRender(<ColorScale {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should render ColorScale with gradient', () => {
  const {
    wrapper: { container },
  } = render();
  expect(container).toMatchSnapshot();
});

test('should render ColorScale with discrete mode', () => {
  const {
    wrapper: { container },
  } = render({ colors: ['yellow', 'green', 'red'], mode: 'discrete' });
  expect(container).toMatchSnapshot();
});
