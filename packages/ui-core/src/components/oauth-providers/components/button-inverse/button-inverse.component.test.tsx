import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { ButtonInverse } from './button-inverse.component';

const render = (children: React.ReactNode) => {
  const wrapper = rtlRender(<ButtonInverse>{children}</ButtonInverse>);

  return {
    wrapper,
  };
};

describe('<ButtonInverse />', () => {
  const children = <span>Sign up</span>;
  test('should render button correctly', () => {
    const {
      wrapper: { container },
    } = render(children);

    expect(container).toMatchSnapshot();
  });
});
