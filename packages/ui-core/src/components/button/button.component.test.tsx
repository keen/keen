import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Button from './button.component';

describe('@keen.io/ui-core - <Button />', () => {
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

  it('should apply styles for button with "primary" variant', () => {
    const wrapper = mount(<Button variant="primary">{children}</Button>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render "button" element with proper type', () => {
    const htmlType = 'reset';
    const wrapper = mount(<Button htmlType={htmlType}>{children}</Button>);

    expect(wrapper.find('button').props().type).toEqual(htmlType);
  });
});
