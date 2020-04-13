import React from 'react';
import { mount } from 'enzyme';
import RefText from './ref-text.component';

const setup = (overProps: any = {}) => {
  const props = {
    ...overProps,
  };

  const wrapper = mount(<RefText {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('<RefText />', () => {
  it('should render provided text', () => {
    const text = 'text';
    const { wrapper } = setup({
      children: text,
    });

    expect(wrapper.text()).toEqual(text);
    expect(wrapper.props().children).toEqual(text);
  });

  it('should get ref', () => {
    const text = 'text';
    const ref = jest.fn();
    const { wrapper } = setup({
      ref,
      children: text,
      truncate: true,
    });
    expect(wrapper.text()).toEqual(text);
    expect(ref).toHaveBeenCalled();
  });
});
