import React from 'react';
import { mount } from 'enzyme';

import { StyledCeil } from './table.styles';

import Ceil from './ceil.component';

describe('@keen.io/ui-core - <Ceil />', () => {
  const props = {
    value: 'value',
  };

  it('should render value', () => {
    const wrapper = mount(<Ceil {...props} />);

    const content = wrapper.find(StyledCeil).text();
    expect(content).toEqual(props.value);
  });

  it('should align "string" content to left', () => {
    const wrapper = mount(<Ceil {...props} />);

    const ceilProps = wrapper.find(StyledCeil).props();
    expect(ceilProps).toMatchObject({
      textAlign: 'left',
    });
  });

  it('should align "number" content to right', () => {
    const wrapper = mount(<Ceil value={10} />);

    const ceilProps = wrapper.find(StyledCeil).props();
    expect(ceilProps).toMatchObject({
      textAlign: 'right',
    });
  });

  it('should call "onClick" handler', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Ceil {...props} onClick={mockFn} />);

    wrapper.find(StyledCeil).simulate('click');

    expect(mockFn).toHaveBeenCalledWith(props.value);
  });
});
