import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { action } from '@storybook/addon-actions';

import { InputGroup } from './input-group.component';

export default {
  title: 'Components|InputGroup',
  parameters: {
    component: InputGroup,
    componentSubtitle: 'Group of input components integrated with Formik',
  },
};

const schema = Yup.object().shape({
  firstName: Yup.string().required(),
});

export const withFormik = () => (
  <div style={{ width: 500 }}>
    <Formik
      initialValues={{ firstName: '' }}
      validationSchema={schema}
      onSubmit={action('submit')}
    >
      {() => <InputGroup name="firstName" label="First name" />}
    </Formik>
  </div>
);
