import React from 'react';
import { mount } from 'enzyme';

import MapPath from './map-path.component';

const setup = (overProps: any = {}) => {
  const props = {
    onMouseEnter: jest.fn(),
    onMouseMove: jest.fn(),
    onMouseLeave: jest.fn(),
    path: 'path',
    fill: 'blue',
    strokeWidth: '0.5',
    stroke: 'black',
    ...overProps,
  };

  const wrapper = mount(
    <svg>
      <MapPath {...props} />
    </svg>
  );

  return {
    props,
    wrapper,
  };
};

describe('@keen.io/charts - <MapPath />', () => {
  it('should call "onMouseEnter" handler', () => {
    const { wrapper, props } = setup();
    wrapper.find('path').simulate('mouseenter');

    expect(props.onMouseEnter).toHaveBeenCalled();
  });

  it('should call "onMouseLeave" handler', () => {
    const { wrapper, props } = setup();
    wrapper.find('path').simulate('mouseleave');

    expect(props.onMouseLeave).toHaveBeenCalled();
  });

  it('should set "path" element properties', () => {
    const { wrapper } = setup();
    const element = wrapper.find('path');

    expect(element.props()).toMatchObject({
      d: 'path',
      fill: 'blue',
      strokeWidth: '0.5',
      stroke: 'black',
    });
  });
});
