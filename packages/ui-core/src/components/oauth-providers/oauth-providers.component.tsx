/* eslint-disable @typescript-eslint/naming-convention */
import React, { FC } from 'react';
import { GoogleIcon, GitHubIcon } from './icons';

import { Container, Separator, IconContainer } from './oauth-providers.styles';
import { ButtonInverse } from './components/';

import { serializeToQuery } from './utils';

import { OAuthUserAction, OAuthConfig } from './types';

type Props = {
  /** OAuth apps configuration */
  config: OAuthConfig;
  /* The URL of OAuth flow initiator */
  requestInitiatorUrl: string;
  /** The callback URL used by OAuth provider */
  callbackHandlerHost: string;
  /* OAuth flow action */
  action?: OAuthUserAction;
};

const OAuthProviders: FC<Props> = ({
  config,
  requestInitiatorUrl,
  callbackHandlerHost,
  action = OAuthUserAction.REGISTER,
}: Props) => {
  const {
    googleOAuth,
    googleOAuth: { label: googleLabel },
    gitHubOAuth,
    gitHubOAuth: { label: githubLabel },
  } = config;

  return (
    <Container>
      <ButtonInverse
        data-testid="google-oauth"
        onClick={() => {
          const googleOauthParams = serializeToQuery({
            scope: googleOAuth.scope,
            include_granted_scopes: true,
            response_type: 'code',
            state: JSON.stringify({ action, requestInitiatorUrl }),
            client_id: googleOAuth.clientId,
            redirect_uri: `${callbackHandlerHost}/${googleOAuth.redirectUri}`,
          });

          window.location.replace(`${googleOAuth.url}?${googleOauthParams}`);
        }}
      >
        <IconContainer>
          <GoogleIcon />
        </IconContainer>
        {googleLabel}
      </ButtonInverse>
      <Separator />
      <ButtonInverse
        data-testid="github-oauth"
        onClick={() => {
          const gitHubOauthParams = serializeToQuery({
            scope: gitHubOAuth.scope,
            client_id: gitHubOAuth.clientId,
            state: JSON.stringify({ action, requestInitiatorUrl }),
          });

          window.location.replace(`${gitHubOAuth.url}?${gitHubOauthParams}`);
        }}
      >
        <IconContainer>
          <GitHubIcon />
        </IconContainer>
        {githubLabel}
      </ButtonInverse>
    </Container>
  );
};

export default OAuthProviders;
