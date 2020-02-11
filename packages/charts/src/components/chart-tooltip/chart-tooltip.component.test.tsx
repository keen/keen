import React from 'react';
import { mount } from 'enzyme';

import ChartTooltip from './chart-tooltip.component';

const setup = (overProps: any = {}) => {
  const props = {
    x: 0,
    y: 0,
    visible: false,
    ...overProps,
  };

  const wrapper = mount(
    <svg>
      <ChartTooltip {...props} />
    </svg>
  );

  return { wrapper, props };
};

describe('@keen.io/charts - <ChartTooltip />', () => {
  it('should not render "foreignObject" node', () => {
    const { wrapper } = setup();

    expect(wrapper.find('foreignObject').length).toBeFalsy();
  });

  it('should render "foreignObject" node', () => {
    const { wrapper } = setup({ visible: true });

    expect(wrapper.find('foreignObject').length).toBeTruthy();
  });

  it('should setup "foreignObject" x and y position', () => {
    const { wrapper, props } = setup({ visible: true, x: 10, y: 20 });

    const { x, y } = wrapper.find('foreignObject').props();

    expect(x).toEqual(props.x);
    expect(y).toEqual(props.y);
  });
});
