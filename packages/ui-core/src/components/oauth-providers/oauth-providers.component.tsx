/* eslint-disable @typescript-eslint/camelcase */
import React, { FC } from 'react';
import { GoogleIcon, GitHubIcon } from './icons';

import { Container, Separator, IconWrapper } from './oauth-providers.styles';
import { ButtonInverse } from './components/';

import { serializeToQuery } from './utils';

import { OAuthSource, OAuthProvidersConfig } from './types';

type Props = {
  config: OAuthProvidersConfig;
  source?: OAuthSource;
};

const OAuthProviders: FC<Props> = ({
  config,
  source = OAuthSource.REGISTER,
}: Props) => {
  const {
    googleOAuth,
    googleOAuth: { label: googleLabel },
    gitHubOAuth,
    gitHubOAuth: { label: githubLabel },
    host,
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
            redirect_uri: `${host}/${googleOAuth.redirectUri}?source=${source}`,
            client_id: googleOAuth.clientId,
          });
          window.location.replace(`${googleOAuth.url}?${googleOauthParams}`);
        }}
      >
        <IconWrapper>
          <GoogleIcon />
        </IconWrapper>
        {googleLabel}
      </ButtonInverse>
      <Separator />
      <ButtonInverse
        data-testid="github-oauth"
        onClick={() => {
          const gitHubOauthParams = serializeToQuery({
            scope: gitHubOAuth.scope,
            client_id: gitHubOAuth.clientId,
            state: source,
          });
          window.location.replace(`${gitHubOAuth.url}?${gitHubOauthParams}`);
        }}
      >
        <IconWrapper>
          <GitHubIcon />
        </IconWrapper>
        {githubLabel}
      </ButtonInverse>
    </Container>
  );
};

export default OAuthProviders;
