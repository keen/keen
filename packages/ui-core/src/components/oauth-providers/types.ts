export enum OAuthSource {
  REGISTER = 'signup',
  LOGIN = 'login',
  ACCEPT_INVITE = 'invite',
}

export type OAuthProvidersConfig = {
  googleOAuth: {
    label: string;
    url: string;
    clientId: string;
    redirectUri: string;
    scope: string;
  };
  gitHubOAuth: {
    label: string;
    url: string;
    scope: string;
    clientId: string;
  };
  host: string;
};
