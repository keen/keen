import React from 'react';
import { mount } from 'enzyme';

import PasswordInput from './password-input.component';

describe('@keen.io/ui-core - <PasswordInput />', () => {
  it('should render "password" input HTML element', () => {
    const wrapper = mount(<PasswordInput />);

    expect(wrapper.find('input').props().type).toEqual('password');
  });

  it('should change input element type to "text"', () => {
    const wrapper = mount(<PasswordInput />);
    wrapper.find('svg').simulate('click');

    expect(wrapper.find('input').props().type).toEqual('text');
  });
});
