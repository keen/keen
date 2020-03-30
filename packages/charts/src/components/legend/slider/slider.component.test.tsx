import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Slider from './slider.component';

import { SliderItem, Button } from './slider.styles';

describe('@keen.io/charts - <Slider />', () => {
  it('should group children based on "slidesPerRow" property', () => {
    const wrapper = mount(
      <Slider mode="vertical" slidesPerRow={2}>
        <div key="1">slide #1</div>
        <div key="2">slide #2</div>
      </Slider>
    );

    expect(
      wrapper.contains([
        <SliderItem key="1">
          <div>slide #1</div>
        </SliderItem>,
        <SliderItem key="2">
          <div>slide #2</div>
        </SliderItem>,
      ])
    ).toEqual(true);
  });

  it('should render navigation buttons', () => {
    const wrapper = mount(
      <Slider mode="vertical" slidesPerRow={1}>
        <div>slide #1</div>
      </Slider>
    );

    expect(wrapper.find(Button).length).toEqual(2);
  });
});
