import React from 'react';
import { mount } from 'enzyme';

import HoverBar from './hover-bar.component';

import { ChartContext } from '../../contexts';

const setup = (overProps: any = {}) => {
  const props = {
    x: 0,
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    ...overProps,
  };

  const context = {
    margins: { top: 10, bottom: 10, left: 10, right: 10 },
    svgDimensions: { width: 100, height: 100 },
  };

  const wrapper = mount(
    <ChartContext.Provider value={context}>
      <svg>
        <HoverBar {...props} />
      </svg>
    </ChartContext.Provider>
  );

  return { wrapper, props };
};

describe('@keen.io/charts - <HoverBar />', () => {
  it('should render a "linearGradient" svg element', () => {
    const { wrapper } = setup();

    expect(wrapper.find('linearGradient').length).toBeTruthy();
  });

  it('should call "onMouseEnter" handler', () => {
    const { wrapper, props } = setup();
    wrapper.find('rect').simulate('mouseenter');

    expect(props.onMouseEnter).toHaveBeenCalled();
  });

  it('should call "onMouseLeave" handler', () => {
    const { wrapper, props } = setup();
    wrapper.find('rect').simulate('mouseleave');

    expect(props.onMouseLeave).toHaveBeenCalled();
  });
});
