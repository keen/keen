import React from 'react';
import { mount } from 'enzyme';

import Text from './text.component';

const setup = (overProps: object = {}) => {
  const props = {
    ...overProps,
    dx: 0,
    dy: 0,
    children: '@keen',
  };

  const wrapper = mount(
    <svg>
      <Text {...props} />
    </svg>
  );

  return {
    wrapper,
    props,
  };
};

describe('@keen/charts - <Text />', () => {
  it('should render children', () => {
    const { wrapper, props } = setup();

    expect(wrapper.text()).toEqual(props.children);
  });

  it('should set coordinates for <text /> element', () => {
    const { wrapper } = setup({ dx: 5, dy: 10 });

    expect(wrapper.props()).toMatchInlineSnapshot(`
      Object {
        "children": <Text
          dx={0}
          dy={0}
        >
          @keen
        </Text>,
      }
    `);
  });
});
