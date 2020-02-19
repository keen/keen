import React from 'react';
import { mount } from 'enzyme';

import ChartTooltip from './chart-tooltip.component';

import { ChartContext } from '../../contexts';

const setup = (overProps: any = {}) => {
  const props = {
    x: 0,
    y: 0,
    visible: false,
    ...overProps,
  };

  const svgDimensions = { width: 100, height: 100 };
  const margins = { top: 10, left: 10, bottom: 10, right: 10 };

  const wrapper = mount(
    <svg>
      <ChartContext.Provider value={{ svgDimensions, margins }}>
        <ChartTooltip {...props} />
      </ChartContext.Provider>
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
