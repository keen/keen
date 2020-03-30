import React from 'react';
import { shallow } from 'enzyme';
import Control from './control.component';

describe('<Control />', () => {
  const props = {
    initialPos: 0,
    sliderSize: 200,
    min: 0,
    max: 100,
    dragConstraints: {
      top: 0,
      left: 0,
      right: 100,
      bottom: 100,
    },
    steps: 1,
    tooltip: {
      enabled: true,
      position: 'top',
    },
  };

  test('should render Control component', () => {
    const wrapper = shallow(<Control isHorizontal={true} {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
