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

  it('should render HTML element based on level property', () => {
    const { wrapper } = setup({
      level: 3,
    });

    expect(wrapper.find('h3').length).toEqual(1);
  });
});
