import * as React from 'react';

import OAuthProviders from './oauth-providers.component';
import { googleOAuth, gitHubOAuth } from './oauth-providers.fixtures';

import { OAuthUserAction } from './types';

const config = {
  googleOAuth,
  gitHubOAuth,
};

export default {
  title: 'Others/Components/OAuth Providers',
  parameters: {
    component: OAuthProviders,
    componentSubtitle:
      'Component used to enhance user interface with SSO features',
  },
};

export const basic = () => (
  <div style={{ width: '400px', height: '400px' }}>
    <OAuthProviders
      config={config}
      action={OAuthUserAction.LOGIN}
      callbackHandlerHost="callbackHandlerHost"
      requestInitiatorUrl="requestInitiatorUrl"
    />
  </div>
);
