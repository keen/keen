import React from 'react';
import { mount } from 'enzyme';

import Form from './form.component';

describe('@keen.io/forms - <Form />', () => {
  it('should render children', () => {
    const mockFn = jest.fn();
    const Component = () => <input />;
    const wrapper = mount(
      <Form isSubmitting={false} onSubmit={mockFn}>
        <Component />
      </Form>
    );

    expect(
      wrapper.find('form').containsMatchingElement(<Component />)
    ).toBeTruthy();
  });

  it('should call "onSubmit" handler', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Form isSubmitting={false} onSubmit={mockFn} />);
    wrapper.find('form').simulate('keydown', { charCode: 13 });

    expect(mockFn).toHaveBeenCalled();
  });

  it('should not call "onSubmit" handler for keys different that "Enter"', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Form isSubmitting={false} onSubmit={mockFn} />);
    wrapper.find('form').simulate('keydown', { charCode: 20 });

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should not call "onSubmit" handler for truthy "isSubmitting"', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Form isSubmitting={true} onSubmit={mockFn} />);
    wrapper.find('form').simulate('keydown', { charCode: 13 });

    expect(mockFn).not.toHaveBeenCalled();
  });
});
