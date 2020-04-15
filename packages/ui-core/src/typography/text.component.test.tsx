import React from 'react';
import { mount } from 'enzyme';
import Text from './text.component';

const setup = (overProps: any = {}) => {
  const props = {
    ...overProps,
  };

  const wrapper = mount(<Text {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('<Text />', () => {
  it('should render provided text', () => {
    const text = 'text';
    const { wrapper } = setup({
      children: text,
    });

    expect(wrapper.text()).toEqual(text);
    expect(wrapper.props().children).toEqual(text);
  });
});
