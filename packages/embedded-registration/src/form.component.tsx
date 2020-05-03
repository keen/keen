import React, { FC } from 'react';
import { Formik, ErrorMessage, getIn } from 'formik';

import {
  Label,
  Button,
  Input,
  PasswordInput,
  PasswordValidator,
  Error,
  Loader,
} from '@keen.io/ui-core';

import {
  ErrorContainer,
  ButtonContent,
  Footer,
  PasswordHints,
  Text,
  Group,
} from './form.styles';

import { schema } from './schema';

import { FormValues, User } from './types';

type Props = {
  onSignup: (values: FormValues) => Promise<User>;
  onSuccess: (organizationId: string) => void;
  onError: (error: { status: number; message: string }) => void;
};

export const RegisterForm: FC<Props> = ({ onSignup, onError, onSuccess }) => (
  <Formik
    validationSchema={schema}
    initialValues={{
      firstName: '',
      lastName: '',
      companyName: '',
      companyDisclaimer: false,
      password: '',
      email: '',
    }}
    onSubmit={(values: FormValues, actions) => {
      onSignup(values)
        .then(({ organizationId }) => {
          onSuccess(organizationId);
        })
        .catch(err => {
          actions.setSubmitting(false);
          onError(err);
        });
    }}
  >
    {({
      values,
      errors,
      touched,
      isSubmitting,
      handleBlur,
      handleChange,
      handleSubmit,
    }) => (
      <form onSubmit={handleSubmit}>
        <Group>
          <Label htmlFor="firstName" hasError={getIn(errors, 'firstName')}>
            First name
          </Label>
          <Input
            name="firstName"
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
          />
          <ErrorContainer>
            <ErrorMessage name="firstName" component={Error} />
          </ErrorContainer>
        </Group>
        <Group>
          <Label htmlFor="lastName" hasError={getIn(errors, 'lastName')}>
            Last name
          </Label>
          <Input
            name="lastName"
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
          />
          <ErrorContainer>
            <ErrorMessage name="lastName" component={Error} />
          </ErrorContainer>
        </Group>
        <Group>
          <Label htmlFor="companyName" hasError={getIn(errors, 'companyName')}>
            Company name
          </Label>
          <Input
            name="companyName"
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.companyName}
          />
          <ErrorContainer>
            <ErrorMessage name="companyName" component={Error} />
          </ErrorContainer>
        </Group>
        <Group>
          <Label htmlFor="email" hasError={getIn(errors, 'email')}>
            Email
          </Label>
          <Input
            name="email"
            type="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
          />
          <ErrorContainer>
            <ErrorMessage name="email" component={Error} />
          </ErrorContainer>
        </Group>
        <Group>
          <Label htmlFor="password" hasError={getIn(errors, 'password')}>
            Password
          </Label>
          <PasswordInput
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
          />
          <PasswordHints>
            <PasswordValidator
              password={values.password}
              touched={touched.password}
            />
          </PasswordHints>
        </Group>
        <Footer>
          <Button htmlType="submit">
            {isSubmitting ? (
              <ButtonContent>
                <Text>Checking your data</Text>
                <Loader width={22} height={22} />
              </ButtonContent>
            ) : (
              <>Finish registration</>
            )}
          </Button>
        </Footer>
      </form>
    )}
  </Formik>
);

export default RegisterForm;
