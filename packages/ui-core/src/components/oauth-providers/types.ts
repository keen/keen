export type OAuthConfig = {
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
};

export enum OAuthUserAction {
  REGISTER = 'signup',
  LOGIN = 'login',
  ACCEPT_INVITE = 'invite',
}

export type OAuthState = {
  /* OAuth flow action */
  action: OAuthUserAction;
  /* The URL of OAuth flow initiator */
  requestInitiatorUrl: string;
};
