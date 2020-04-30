import React from 'react';
import { mount } from 'enzyme';

import Checkbox from './checkbox.component';

describe('@keen.io/ui-core - <Checkbox />', () => {
  it('should call "onChange" handler', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Checkbox id="id" checked={true} onChange={mockFn} />
    );

    wrapper
      .find('input[type="checkbox"]')
      .first()
      .simulate('change', {
        target: { checked: true },
      });

    expect(mockFn).toHaveBeenCalled();
  });

  it('should set checkbox element "checked" to truthy value', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Checkbox id="id" checked={true} onChange={mockFn} />
    );

    expect(wrapper.find('input[type="checkbox"]').props().checked).toBeTruthy();
  });

  it('should set checkbox element "checked" to false value', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Checkbox id="id" checked={false} onChange={mockFn} />
    );

    expect(wrapper.find('input[type="checkbox"]').props().checked).toBeFalsy();
  });
});
