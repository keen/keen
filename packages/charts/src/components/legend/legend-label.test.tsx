import React from 'react';
import { mount } from 'enzyme';

import { Typography } from '@keen/ui-core';

import LegendLabel from './legend-label.component';
import { Text } from './legend-label.styles';

describe('@keen/charts - <LegendLabel />', () => {
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
      <LegendLabel {...props} truncate={10} text={text} onClick={mockFn} />
    );

    expect(wrapper.find(Text).text()).toEqual('Lorem ipsu...');
  });

  it('should provide disable state in "onClick" handler', () => {
    const wrapper = mount(
      <LegendLabel {...props} text={'Lorem ipsum'} onClick={mockFn} />
    );

    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalledWith(true);
  });
});
