/* eslint-disable react/display-name */
import React, { ComponentProps } from 'react';
import { Formik } from 'formik';
import { render as rtlRender } from '@testing-library/react';

import InputGroup from './input-group.component';

const render = (overProps: Partial<ComponentProps<typeof InputGroup>> = {}) => {
  const props = {
    label: 'label',
    ...overProps,
  };

  const submitMock = jest.fn();

  const initialValues = {
    email: '',
  };

  const wrapper = rtlRender(
    <Formik
      onSubmit={submitMock}
      initialValues={initialValues}
      validate={(values) => {
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

test('should render "label" HTML element with provided text', () => {
  const {
    wrapper: { getByLabelText },
    props: { label },
  } = render();
  expect(getByLabelText(label)).toBeInTheDocument();
});

test('should pass "type" HTML attribute to input element', () => {
  const {
    wrapper: { container },
  } = render({ type: 'number' });
  const input = container.querySelector('input');
  const inputType = input.getAttribute('type');

  expect(inputType).toEqual('number');
});

test('should pass "renderIcon" handler to input element', () => {
  const renderIcon = jest.fn().mockImplementation(() => <div />);
  render({ renderIcon });

  expect(renderIcon).toHaveBeenCalled();
});
