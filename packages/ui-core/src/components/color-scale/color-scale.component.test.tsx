import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import ColorScale from './color-scale.component';

describe('<ColorScale />', () => {
  it('should render ColorScale with gradient', () => {
    const wrapper = shallow(<ColorScale />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render ColorScale with discrete mode', () => {
    const wrapper = shallow(
      <ColorScale colors={['yellow', 'green', 'red']} mode="discrete" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
