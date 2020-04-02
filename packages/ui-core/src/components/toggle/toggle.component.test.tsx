import React from 'react';
import { mount } from 'enzyme';

import Toggle from './toggle.component';

const setup = (overProps: any = {}) => {
  const props = {
    ...overProps,
  };

  const wrapper = mount(<Toggle {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('<Toggle />', () => {
  it('should render provided text', () => {
    const children = 'text';
    const { wrapper } = setup({
      children,
    });

    expect(wrapper.props().children).toEqual(children);
  });

  it('should render "off" text for unchecked input', () => {
    const children = '';
    const { wrapper } = setup({
      children,
    });

    expect(wrapper.text()).toEqual('off');
  });

  it('should render "on" text for checked input', () => {
    const children = '';
    const { wrapper } = setup({
      children,
    });
    wrapper
      .find('input[type="checkbox"]')
      .simulate('change', { target: { checked: true } });
    wrapper.update();
    expect(wrapper.text()).toEqual('on');
  });

  it('should render provided text for toggle', () => {
    const children = '';
    const text = ['yes', 'no'];
    const { wrapper } = setup({
      children,
      text,
    });

    expect(wrapper.text()).toEqual(text[1]);
    wrapper
      .find('input[type="checkbox"]')
      .simulate('change', { target: { checked: true } });
    wrapper.update();
    expect(wrapper.text()).toEqual(text[0]);
  });

  it('should call onChange if provided', () => {
    const onChange = jest.fn();
    const children = '';
    const { wrapper } = setup({
      children,
      onChange,
    });

    wrapper.simulate('click');
    expect(onChange).toHaveBeenCalled();
  });
});
