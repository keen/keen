import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Toggle from './toggle.component';

const setup = (overProps: any = {}) => {
  const props = {
    ...overProps,
  };

  const wrapper = mount(<Toggle {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('<Toggle />', () => {
  test('should render Toggle component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onChange if provided', () => {
    const onChange = jest.fn();
    const { wrapper } = setup({
      onChange,
    });

    wrapper.simulate('click');
    expect(onChange).toHaveBeenCalled();
  });
});
