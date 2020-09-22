import React from 'react';
import ReactDOM from 'react-dom';
import { RestfulProvider } from 'restful-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { parse } from 'query-string';

import App from './app.component';
import { setUtmCookie } from './utils';

import { Options, OAuthSignUpConfig } from './types';

class EmbeddedRegistration {
  /** Container used to mount widget */
  private container: HTMLElement | string;

  /** Offer identifier used for registration  */
  private offerHandle: string;

  /** Label used on CTA button */
  private ctaLabel: string;

  /** API url  */
  private apiUrl: string;

  /** Success callback handler  */
  private onSuccess: () => void;

  /** URL params for cookies to track registration sources etc. */
  private utmCookies: string[];

  /** Show SSO providers indicator */
  private useOAuthProviders: boolean;

  /** OAuth applications config */
  private oauthConfig: OAuthSignUpConfig;

  constructor({
    container,
    offerHandle,
    ctaLabel,
    apiUrl,
    onSuccess,
    oauthConfig,
    useOAuthProviders = false,
    utmCookies = ['utm_source', 'utm_campaign'],
  }: Options) {
    this.container = container;
    this.offerHandle = offerHandle;
    this.ctaLabel = ctaLabel;
    this.apiUrl = apiUrl;
    this.onSuccess = onSuccess;
    this.utmCookies = utmCookies;
    this.useOAuthProviders = useOAuthProviders;
    this.oauthConfig = oauthConfig;
  }

  private isOAuthCompleteFlow() {
    const locationParams = parse(window.location.search);
    return !!locationParams.token;
  }

  render() {
    setUtmCookie(this.utmCookies);

    const container =
      this.container instanceof HTMLElement
        ? this.container
        : document.querySelector(this.container);

    ReactDOM.render(
      <Router>
        <RestfulProvider
          base={this.apiUrl}
          requestOptions={() => ({
            credentials: 'include',
            headers: { Accept: 'application/json' },
          })}
        >
          <App
            showOAuthProviders={this.useOAuthProviders}
            oauthConfig={this.oauthConfig}
            offerHandle={this.offerHandle}
            onSuccessCallback={this.onSuccess}
            isOAuthCompleteFlow={this.isOAuthCompleteFlow()}
            apiUrl={this.apiUrl}
            ctaLabel={this.ctaLabel}
          />
        </RestfulProvider>
      </Router>,
      container
    );
  }
}

export default EmbeddedRegistration;
