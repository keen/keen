/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, useState, useCallback } from 'react';
import { useMutate } from 'restful-react';

import { Alert, Loader, Button } from '@keen.io/ui-core';

import RegisterForm from './form.component';
import { Heading, Message, Label, Notification } from './app.styles';

import { getErrorMessage } from './notification';
import { transformPayload, transformSignupResponse } from './utils';

import { FormValues } from './types';

const REDIRECT_TIME = 4000;

type Props = {
  apiUrl: string;
  offerHandle: string;
  ctaLabel: string;
  onSuccessCallback?: () => void;
};

export const App: FC<Props> = ({
  apiUrl,
  ctaLabel,
  offerHandle,
  onSuccessCallback,
}) => {
  const [errorCode, setErrorCode] = useState(null);
  const [successRegisteration, setSuccessRegistration] = useState(false);
  const [registrationMeta, setRegistrationMeta] = useState({
    organizationId: null,
    companyDisclaimer: false,
  });
  const { mutate: signup } = useMutate({
    verb: 'POST',
    path: '/users/signup',
    resolve: transformSignupResponse,
  });

  const onSuccess = useCallback(
    (organizationId: string, companyDisclaimer: boolean) => {
      if (onSuccessCallback) onSuccessCallback();
      setRegistrationMeta({ organizationId, companyDisclaimer });
      setSuccessRegistration(true);
      setTimeout(() => {
        if (companyDisclaimer) {
          window.location.replace(
            `${apiUrl}/organizations/${organizationId}/name`
          );
        } else {
          window.location.replace(`${apiUrl}/users/login`);
        }
      }, REDIRECT_TIME);
    },
    []
  );

  const onError = useCallback(({ status }: { status: number }) => {
    setErrorCode(status);
  }, []);

  const onSignup = useCallback(
    (values: FormValues) => {
      setErrorCode(null);
      const requestBody = transformPayload(values, offerHandle);
      return signup(requestBody);
    },
    [offerHandle]
  );

  return (
    <>
      {errorCode && (
        <Notification>
          <Alert type="error">{getErrorMessage(errorCode)}</Alert>
        </Notification>
      )}
      {successRegisteration ? (
        <>
          <Heading>Your account has been succesfully created</Heading>
          <Message>
            Log in to the platform now and start streaming data today.
          </Message>
          <Button
            htmlType="button"
            onClick={() => {
              if (registrationMeta.companyDisclaimer) {
                window.location.replace(
                  `${apiUrl}/organizations/${registrationMeta.organizationId}/name`
                );
              } else {
                window.location.replace(`${apiUrl}/users/login`);
              }
            }}
          >
            <Label>Redirecting to Login Page</Label>
            <Loader width={22} height={22} />
          </Button>
        </>
      ) : (
        <RegisterForm
          apiUrl={apiUrl}
          buttonLabel={ctaLabel}
          onSignup={onSignup}
          onError={onError}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
};
