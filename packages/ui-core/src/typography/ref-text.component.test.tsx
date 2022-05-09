import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import RefText from './ref-text.component';

const render = (overProps: any = {}) => {
  const props = {
    children: 'text',
    ...overProps,
  } as any;

  const wrapper = rtlRender(<RefText {...props} />);

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

test('should get ref', () => {
  const ref = jest.fn();
  render({
    ref,
    truncate: true,
  });
  expect(ref).toHaveBeenCalled();
});
