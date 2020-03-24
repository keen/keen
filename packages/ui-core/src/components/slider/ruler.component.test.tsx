import React from 'react';
import { shallow } from 'enzyme';
import Ruler from './ruler.component';

describe('<Ruler />', () => {
  const props = {
    controlSize: 12,
    ticks: [
      {
        pos: 0,
        val: 0,
      },
      {
        pos: 10,
        val: 10,
      },
      {
        pos: 20,
        val: 20,
      },
    ],
  };

  it('should render correctly horizontal ruler', () => {
    const wrapper = shallow(<Ruler layout="horizontal" {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly vertical ruler', () => {
    const wrapper = shallow(<Ruler layout="vertical" {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
