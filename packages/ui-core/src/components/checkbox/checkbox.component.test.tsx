import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

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

  it('should set checkbox element "disabled" to truthy value', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Checkbox id="id" disabled={true} onChange={mockFn} />
    );

    expect(
      wrapper.find('input[type="checkbox"]').props().disabled
    ).toBeTruthy();
  });

  it('should set checkbox element "disabled" to false value', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Checkbox id="id" disabled={false} onChange={mockFn} />
    );

    expect(wrapper.find('input[type="checkbox"]').props().disabled).toBeFalsy();
  });

  it('should set primary checkbox style', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Checkbox id="id" onChange={mockFn} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should set secondary checkbox style', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Checkbox id="id" type="secondary" onChange={mockFn} />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
