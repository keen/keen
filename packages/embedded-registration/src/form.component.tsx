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
import { Icon } from '@keen.io/icons';
import { Form, InputGroup, FieldGroup, ErrorContainer } from '@keen.io/forms';
import { colors } from '@keen.io/colors';

import { ServiceTerms } from './components';
import {
  Footer,
  CompanyMessage,
  CompanyDisclaimer,
  PasswordHints,
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
      <Form isSubmitting={isSubmitting} onSubmit={handleSubmit}>
        <FieldGroup>
          <InputGroup name="firstName" label="First name" />
        </FieldGroup>
        <FieldGroup>
          <InputGroup name="lastName" label="Last name" />
        </FieldGroup>
        <FieldGroup>
          <Label
            htmlFor="companyName"
            hasError={
              getIn(touched, 'companyName') && getIn(errors, 'companyName')
            }
          >
            Company name
          </Label>
          <Input
            name="companyName"
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.companyName}
            hasError={
              getIn(touched, 'companyName') && getIn(errors, 'companyName')
            }
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
        </FieldGroup>
        <FieldGroup>
          <InputGroup name="email" label="Email" />
        </FieldGroup>
        <FieldGroup>
          <Label
            htmlFor="password"
            hasError={getIn(touched, 'password') && getIn(errors, 'password')}
          >
            Password
          </Label>
          <PasswordInput
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            hasError={getIn(touched, 'password') && getIn(errors, 'password')}
          />
          <PasswordHints>
            <PasswordValidator
              password={values.password}
              touched={touched.password}
            />
          </PasswordHints>
        </FieldGroup>
        <ServiceTerms baseUrl={apiUrl} disclaimer={buttonLabel} />
        <Footer>
          <Button
            htmlType="button"
            data-button="submit"
            isDisabled={isSubmitting}
            onClick={submitForm}
            icon={
              isSubmitting ? (
                <Loader width={22} height={22} />
              ) : (
                <Icon
                  type="button-arrow"
                  width={32}
                  height={32}
                  fill={colors.black['500']}
                />
              )
            }
          >
            {isSubmitting ? 'Checking your data' : buttonLabel}
          </Button>
        </Footer>
      </Form>
    )}
  </Formik>
);

export default RegisterForm;
