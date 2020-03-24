import React from 'react';
import { shallow } from 'enzyme';
import Slider from './slider.component';

describe('<Slider />', () => {
  const colors = ['white', 'blue'];

  test('should render Slider component', () => {
    const wrapper = shallow(<Slider colors={colors} />);
    expect(wrapper).toMatchSnapshot();
  });
});
