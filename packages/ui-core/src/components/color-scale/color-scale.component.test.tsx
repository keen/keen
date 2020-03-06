import React from 'react';
import { shallow } from 'enzyme';

import ColorScale from './color-scale.component';

describe('<ColorScale />', () => {
  it('should render ColorScale with gradient', () => {
    const wrapper = shallow(<ColorScale />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render ColorScale with steps', () => {
    const wrapper = shallow(
      <ColorScale colors={['yellow', 'green', 'red']} colorMode="steps" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
