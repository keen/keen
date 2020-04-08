import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Button from './button.component';

describe('<Button />', () => {
  const children = <span>Sign up</span>;

  it('should render children', () => {
    const wrapper = mount(<Button>{children}</Button>);

    expect(wrapper.contains(children)).toBeTruthy();
  });

  it('should render "anchor" element', () => {
    const wrapper = mount(<Button href="https://keen.io">{children}</Button>);

    expect(wrapper.find('a').length).toBeTruthy();
  });

  it('should call "onClick" handler', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Button onClick={mockFn}>{children}</Button>);
    wrapper.simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });

  it('should not call "onClick" handler for disable state', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Button isDisabled={true} onClick={mockFn}>
        {children}
      </Button>
    );
    wrapper.simulate('click');

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should apply styles for button with type "primary"', () => {
    const wrapper = mount(<Button type="primary">{children}</Button>);

    expect(wrapper).toMatchSnapshot();
  });
});
