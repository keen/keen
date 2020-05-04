import React from 'react';
import { mount } from 'enzyme';

import Title from './title.component';

const setup = (overProps: any = {}) => {
  const props = {
    ...overProps,
  };

  const wrapper = mount(<Title {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('<Title />', () => {
  it('should render provided text', () => {
    const text = 'text';
    const { wrapper } = setup({
      children: text,
    });

    expect(wrapper.text()).toEqual(text);
    expect(wrapper.props().children).toEqual(text);
  });

  it('should render HTML heading element based on variant property', () => {
    const { wrapper } = setup({
      variant: 'h3',
    });

    expect(wrapper.find('h3').length).toEqual(1);
  });

  it('should render HTML "div" element based on variant property', () => {
    const { wrapper } = setup({
      variant: 'number-l',
    });

    expect(wrapper.find('div').length).toEqual(1);
  });
});
