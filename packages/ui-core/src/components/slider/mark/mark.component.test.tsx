import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Mark from './mark.component';
import { Circle } from './mark.styles';

describe('@keen.io/ui-core - <Mark />', () => {
  const props = {
    size: 10,
    backgroundColor: 'black',
    borderColor: 'gray',
  };

  it('should call "onMouseEnter" handler', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Mark {...props} onMouseEnter={mockFn} />);

    wrapper.simulate('mouseEnter');

    expect(mockFn).toHaveBeenCalled();
  });

  it('should call "onMouseLeave" handler', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Mark {...props} onMouseLeave={mockFn} />);

    wrapper.simulate('mouseLeave');

    expect(mockFn).toHaveBeenCalled();
  });

  it('should set element dimension based on "size" property', () => {
    const wrapper = mount(<Mark {...props} />);

    expect(wrapper.find(Circle)).toMatchSnapshot();
  });
});
