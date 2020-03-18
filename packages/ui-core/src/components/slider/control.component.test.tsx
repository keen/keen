import React from 'react';
import { shallow } from 'enzyme';
import Control from './control.component';

describe('<Slider />', () => {
  const props = {
    x: 0,
    sliderWidth: 200,
    min: 0,
    max: 100,
    dragConstraintsLeft: 0,
    dragConstraintsRight: 200,
    steps: 1,
  };

  test('should call set state', () => {
    const wrapper = shallow(<Control {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
