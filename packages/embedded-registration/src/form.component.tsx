import React, { FC } from 'react';
import { Formik, ErrorMessage, getIn } from 'formik';

import {
  Label,
  Button,
  Input,
  Checkbox,
  PasswordInput,
  PasswordValidator,
  Error,
  Loader,
} from '@keen.io/ui-core';

import { ServiceTerms } from './components';
import {
  ErrorContainer,
  ButtonContent,
  Footer,
  CompanyMessage,
  CompanyDisclaimer,
  PasswordHints,
  Text,
  Group,
} from './form.styles';

import { schema } from './schema';

import { FormValues, User } from './types';

type Props = {
  buttonLabel: string;
  apiUrl: string;
  onSignup: (values: FormValues) => Promise<User>;
  onSuccess: (organizationId: string, companyDisclaimer: boolean) => void;
  onError: (error: { status: number; message: string }) => void;
};

export const RegisterForm: FC<Props> = ({
  buttonLabel,
  apiUrl,
  onSignup,
  onError,
  onSuccess,
}) => (
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
      actions.setSubmitting(true);
      onSignup(values)
        .then(({ organizationId }) => {
          onSuccess(organizationId, values.companyDisclaimer);
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
      submitForm,
      isSubmitting,
      handleBlur,
      handleChange,
      handleSubmit,
      setFieldValue,
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
            <ErrorMessage
              data-error="firstName"
              name="firstName"
              component={Error}
            />
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
            <ErrorMessage
              data-error="lastName"
              name="lastName"
              component={Error}
            />
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
          <CompanyDisclaimer htmlFor="companyDisclaimer">
            <Checkbox
              id="companyDisclaimer"
              checked={values.companyDisclaimer}
              onChange={() =>
                setFieldValue('companyDisclaimer', !values.companyDisclaimer)
              }
            />
            <CompanyMessage>
              I am not associated with any company
            </CompanyMessage>
          </CompanyDisclaimer>
          <ErrorContainer>
            <ErrorMessage
              data-error="companyName"
              name="companyName"
              component={Error}
            />
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
            <ErrorMessage data-error="email" name="email" component={Error} />
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
        <ServiceTerms baseUrl={apiUrl} disclaimer={buttonLabel} />
        <Footer>
          <Button
            htmlType="button"
            data-button="submit"
            isDisabled={isSubmitting}
            onClick={submitForm}
          >
            {isSubmitting ? (
              <ButtonContent>
                <Text>Checking your data</Text>
                <Loader width={22} height={22} />
              </ButtonContent>
            ) : (
              <>{buttonLabel}</>
            )}
          </Button>
        </Footer>
      </form>
    )}
  </Formik>
);

export default RegisterForm;
