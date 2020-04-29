import React, { FC } from 'react';
import { useFormik } from 'formik';

import { Label, Button, Input, Error, Loader } from '@keen.io/ui-core';

import {
  ErrorContainer,
  ButtonContent,
  ActionIndicators,
  ButtonLabel,
} from './form.styles';

import { schema } from './schema';

import { FormValues, User } from './types';

type Props = {
  onSignup: (values: FormValues) => Promise<User>;
  onSuccess: (organizationId: string) => void;
  onError: (error: { status: number; message: string }) => void;
};

export const RegisterForm: FC<Props> = ({ onSignup, onError, onSuccess }) => {
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
    },
    onSubmit: (values: FormValues) => {
      onSignup(values)
        .then(({ organizationId }) => {
          onSuccess(organizationId);
        })
        .catch(err => {
          formik.setSubmitting(false);
          onError(err);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Label htmlFor="firstName">First name</Label>
      <Input
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <ErrorContainer>
        {formik.touched.firstName && formik.errors.firstName && (
          <Error>{formik.errors.firstName}</Error>
        )}
      </ErrorContainer>
      <Label htmlFor="lastName">Last name</Label>
      <Input
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      <ErrorContainer>
        {formik.touched.lastName && formik.errors.lastName && (
          <Error>{formik.errors.lastName}</Error>
        )}
      </ErrorContainer>
      <Label htmlFor="email">Email</Label>
      <Input
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <ErrorContainer>
        {formik.touched.email && formik.errors.email && (
          <Error>{formik.errors.email}</Error>
        )}
      </ErrorContainer>
      <Label htmlFor="password">Password</Label>
      <Input
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <ErrorContainer>
        {formik.touched.password && formik.errors.password && (
          <Error>{formik.errors.password}</Error>
        )}
      </ErrorContainer>
      <ActionIndicators>
        <Button htmlType="submit">
          {formik.isSubmitting ? (
            <ButtonContent>
              <ButtonLabel>Checking your data</ButtonLabel>
              <Loader width={22} height={22} />
            </ButtonContent>
          ) : (
            <>Finish registration</>
          )}
        </Button>
      </ActionIndicators>
    </form>
  );
};

export default RegisterForm;
