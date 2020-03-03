import React from 'react';
import { mount } from 'enzyme';

import Badge from './badge.component';

const setup = (overProps: any = {}) => {
  const props = {
    type: 'dark',
    ...overProps,
  };

  const wrapper = mount(<Badge {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('@keen.io/ui-core - <Badge />', () => {
  it('should render render children', () => {
    const children = 'text';
    const { wrapper } = setup({
      children,
    });

    expect(wrapper.text()).toEqual(children);
    expect(wrapper.props().children).toEqual(children);
  });
});
