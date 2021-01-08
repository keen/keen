import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import { Tooltip } from '@keen.io/ui-core';

import Rail from './rail';
import Mark from './mark';

import IntervalSlider from './interval-slider.component';

describe('@keen.io/ui-core - <RangeSlider />', () => {
  const props = {
    minimum: 0,
    maximum: 0,
    colors: ['blue', 'red'],
    intervals: [
      {
        minimum: 0,
        maximum: 100,
        step: 1,
      },
    ],
  };

  it('should show tooltip for "mouseEnter" event on drag control', () => {
    const wrapper = mount(<IntervalSlider {...props} />);
    wrapper.find(Mark).first().simulate('mouseEnter');

    expect(wrapper.find(Tooltip).length).toBeTruthy();
  });

  it('should render <Rail /> component', () => {
    const railSettings = {
      size: 10,
      borderRadius: 5,
    };

    const wrapper = mount(
      <IntervalSlider {...props} railSettings={railSettings} />
    );
    const rail = wrapper.find(Rail).first();

    expect(rail.props()).toMatchObject(railSettings);
  });

  it('should set initial value', () => {
    const wrapper = mount(<IntervalSlider {...props} initialValue={50} />);

    expect(wrapper).toMatchSnapshot();
  });
});
