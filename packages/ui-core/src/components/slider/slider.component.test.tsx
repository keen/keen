import React from 'react';
import { shallow } from 'enzyme';
import Slider from './slider.component';

describe('<Slider />', () => {
  const colors = ['white', 'blue'];

  test('should call set state', () => {
    const wrapper = shallow(<Slider colors={colors} />);
    expect(wrapper).toMatchSnapshot();
  });
});
