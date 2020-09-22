/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useCallback, useEffect } from 'react';
import { useMutate } from 'restful-react';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import {
  Alert,
  Loader,
  Button,
  ContentSeparator,
  OAuthProviders,
  OAuthUserAction,
} from '@keen.io/ui-core';

import { RegistrationForm, OAuthComplete } from './components';
import { Heading, Message, Label, Notification } from './app.styles';
import text from './text.json';

import { getErrorMessage } from './notification';
import {
  transformPayload,
  transformOAuthPayload,
  transformSignupResponse,
} from './utils';

import { REDIRECT_TIME } from './constants';
import { FormValues, OAuthError, OAuthSignUpConfig } from './types';

type Props = {
  /** Keen API url */
  apiUrl: string;
  /** Subscription offer handle */
  offerHandle: string;
  /** Sign up button label */
  ctaLabel: string;
  /** Show SSO providers */
  showOAuthProviders: boolean;
  /** OAuth config */
  oauthConfig: OAuthSignUpConfig;
  /** OAuth complete flow indicator */
  isOAuthCompleteFlow: boolean;
  /** Success sign up event handler */
  onSuccessCallback?: () => void;
};

const App: FC<Props> = ({
  apiUrl,
  ctaLabel,
  offerHandle,
  showOAuthProviders,
  isOAuthCompleteFlow,
  oauthConfig,
  onSuccessCallback,
}) => {
  const { search: locationParams } = useLocation();
  const [errorCode, setErrorCode] = useState<number | OAuthError>(null);
  const [successRegistration, setSuccessRegistration] = useState(false);
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
    (requestBody: Record<string, any>) => {
      setErrorCode(null);
      return signup(requestBody);
    },
    [offerHandle]
  );

  useEffect(() => {
    if (locationParams) {
      const { error } = parse(locationParams) as { error?: OAuthError };
      if (error) setErrorCode(error);
    }
  }, []);

  return (
    <>
      {errorCode && (
        <Notification data-testid="error-notification">
          <Alert type="error">{getErrorMessage(errorCode)}</Alert>
        </Notification>
      )}
      {successRegistration ? (
        <>
          <Heading>{text.accountCreated}</Heading>
          <Message>{text.loginToPlatform}</Message>
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
            <Label>{text.redirect}</Label>
            <Loader width={22} height={22} />
          </Button>
        </>
      ) : (
        <>
          {isOAuthCompleteFlow ? (
            <OAuthComplete
              onError={onError}
              onSuccess={onSuccess}
              onSignup={userToken => {
                const requestBody = transformOAuthPayload(
                  userToken,
                  offerHandle
                );
                return onSignup(requestBody);
              }}
            />
          ) : (
            <>
              {showOAuthProviders && (
                <>
                  <OAuthProviders
                    config={oauthConfig}
                    callbackHandlerHost={oauthConfig.callbackHandlerHost}
                    requestInitiatorUrl={oauthConfig.requestInitiatorUrl}
                    action={OAuthUserAction.REGISTER}
                  />
                  <ContentSeparator>{text.separator}</ContentSeparator>
                </>
              )}
              <RegistrationForm
                apiUrl={apiUrl}
                buttonLabel={ctaLabel}
                onSignup={(values: FormValues) => {
                  const requestBody = transformPayload(values, offerHandle);
                  return onSignup(requestBody);
                }}
                onError={onError}
                onSuccess={onSuccess}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default App;
