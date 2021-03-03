import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import Text from './text.component';

const render = (overProps: any = {}) => {
  const props = {
    ...overProps,
    children: '@text',
  };

  const wrapper = rtlRender(<Text {...props} />);

  return {
    wrapper,
    props,
  };
};

test('renders children nodes', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(getByText('@text')).toBeInTheDocument();
});

test('allows to specify HTML element node', () => {
  const {
    wrapper: { container },
  } = render({
    htmlElement: 'section',
  });

  const element = container.querySelector('section');
  expect(element).toBeInTheDocument();
});
