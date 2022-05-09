import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import 'jest-styled-components';

import Title from './title.component';

const render = (overProps: any = {}) => {
  const props = {
    children: 'text',
    ...overProps,
  } as any;

  const wrapper = rtlRender(<Title {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should render provided text', () => {
  const {
    wrapper: { getByText },
    props: { children },
  } = render();

  expect(getByText(children)).toBeInTheDocument();
});

test('should render HTML heading element based on variant property', () => {
  const {
    wrapper: { container },
  } = render({
    variant: 'h3',
  });

  expect(container.querySelector('h3')).toBeInTheDocument();
});

test('should render HTML "div" element based on variant property', () => {
  const {
    wrapper: { getByText },
    props: { children },
  } = render({
    variant: 'number-l',
  });
  const element = getByText(children);
  expect(element).toMatchInlineSnapshot(`
    .c0 {
      font-family: Lato;
      font-weight: lighter;
      font-size: 40px;
      line-height: 50px;
      color: #4F5B5F;
      margin: 0;
      padding: 0;
    }

    <div
      class="c0"
      font-family="Lato"
      font-size="40"
      font-weight="lighter"
    >
      text
    </div>
  `);
});
