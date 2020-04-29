/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, useState, useCallback } from 'react';
import { useMutate } from 'restful-react';

import { Alert } from '@keen.io/ui-core';

import RegisterForm from './form.component';
import { Notification } from './app.styles';

import { getErrorMessage } from './notification';
import { transformPayload, transformSignupResponse } from './utils';

import { FormValues } from './types';

type Props = { apiUrl: string; offerHandle: string };

export const App: FC<Props> = ({ apiUrl, offerHandle }) => {
  const [errorCode, setErrorCode] = useState(null);
  const { mutate: signup } = useMutate({
    verb: 'POST',
    path: '/users/signup',
    resolve: transformSignupResponse,
  });

  const onSuccess = useCallback((organizationId: string) => {
    window.location.replace(`${apiUrl}/organizations/${organizationId}/name`);
  }, []);

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
      <RegisterForm
        onSignup={onSignup}
        onError={onError}
        onSuccess={onSuccess}
      />
    </>
  );
};
