import React from 'react';
import { mount } from 'enzyme';

import { Typography } from '@keen.io/ui-core';

import Label from './label.component';

describe('@keen.io/charts - <LegendLabel />', () => {
  let mockFn: any;
  const props = {
    typography: {
      fontSize: 12,
      fontColor: 'black',
      fontStyle: 'normal',
      fontWeight: 'normal',
    } as Typography,
    markColor: 'green',
  };

  beforeEach(() => {
    mockFn = jest.fn();
  });

  it('should truncate text based on "truncate" property', () => {
    const text = 'Lorem ipsum dolor sit amet';
    const wrapper = mount(
      <Label {...props} truncate={10} text={text} onClick={mockFn} />
    );

    expect(wrapper.find('ForwardRef').text()).toEqual('Lorem ipsu...');
  });

  it('should provide disable state in "onClick" handler', () => {
    const wrapper = mount(
      <Label {...props} text={'Lorem ipsum'} onClick={mockFn} />
    );

    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalledWith(true);
  });
});
