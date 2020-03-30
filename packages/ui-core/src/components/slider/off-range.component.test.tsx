import React from 'react';
import { shallow } from 'enzyme';
import OffRange from './off-range.component';

describe('<OffRange />', () => {
  const props = {
    left: 0,
    size: 100,
  };

  it('should render correctly horizontal component', () => {
    const wrapper = shallow(<OffRange isHorizontal={true} {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly vertical component', () => {
    const wrapper = shallow(<OffRange isHorizontal={false} {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
