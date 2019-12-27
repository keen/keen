import React from 'react';
import { mount } from 'enzyme';

import Card from './card.component';

const setup = (overProps: any = {}) => {
  const props = {
    ...overProps,
  };

  const wrapper = mount(<Card {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('@keen/charts - <Card />', () => {
  it('should render render children', () => {
    const children = 'text';
    const { wrapper } = setup({
      children,
    });

    expect(wrapper.text()).toEqual(children);
    expect(wrapper.props().children).toEqual(children);
  });
});
