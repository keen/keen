import React from 'react';
import { mount } from 'enzyme';
import { Tooltip } from '@keen.io/ui-core';

import RangeSlider from './range-slider.component';

import Control from './control';
import Rail from './rail';
import Mark from './mark';

describe('@keen.io/ui-core - <RangeSlider />', () => {
  const props = {
    minimum: 0,
    maximum: 0,
    colors: ['blue', 'red'],
  };

  it('should render two <Control /> components', () => {
    const wrapper = mount(<RangeSlider {...props} />);

    expect(wrapper.find(Control).length).toEqual(2);
  });

  it('should render <Rail /> component', () => {
    const railSettings = {
      size: 10,
      borderRadius: 5,
    };

    const wrapper = mount(
      <RangeSlider {...props} railSettings={railSettings} />
    );

    const rail = wrapper.find(Rail).first();

    expect(rail.props()).toMatchObject(railSettings);
  });

  it('should show tooltip for "mouseEnter" event on minimum drag control', () => {
    const wrapper = mount(<RangeSlider {...props} />);

    wrapper.find(Mark).first().simulate('mouseEnter');

    expect(wrapper.find(Tooltip).length).toBeTruthy();
  });

  it('should show tooltip for "mouseEnter" event on maximum drag control', () => {
    const wrapper = mount(<RangeSlider {...props} />);

    wrapper.find(Mark).last().simulate('mouseEnter');

    expect(wrapper.find(Tooltip).length).toBeTruthy();
  });
});
