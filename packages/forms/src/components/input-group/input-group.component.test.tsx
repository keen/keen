/* eslint-disable react/display-name */
import React from 'react';
import { Formik } from 'formik';
import { mount } from 'enzyme';

import InputGroup from './input-group.component';

const setup = (overProps: Record<string, any> = {}) => {
  const props = {
    label: 'label',
    ...overProps,
  } as any;

  const submitMock = jest.fn();

  const initialValues = {
    email: '',
  };

  const wrapper = mount(
    <Formik
      onSubmit={submitMock}
      initialValues={initialValues}
      validate={values => {
        const errors: { email?: string } = {};
        if (!values.email) {
          errors.email = 'required';
        }

        return errors;
      }}
    >
      {() => (
        <>
          <InputGroup name="email" {...props} />
        </>
      )}
    </Formik>
  );

  return {
    wrapper,
    initialValues,
    submitMock,
    props,
  };
};

describe('@keen.io/forms - <InputGroup />', () => {
  it('should render "label" HTML element with provided text', () => {
    const { wrapper, props } = setup();

    expect(wrapper.find('label').text()).toEqual(props.label);
  });

  it('should pass "type" HTML attribute to input element', () => {
    const { wrapper } = setup({ type: 'number' });

    expect(wrapper.find('input').props().type).toEqual('number');
  });

  it('should pass "renderIcon" handler to input element', () => {
    const renderIcon = jest.fn().mockImplementation(() => <div />);
    setup({ renderIcon });

    expect(renderIcon).toHaveBeenCalled();
  });
});
