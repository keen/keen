import React from 'react';
import ReactDOM from 'react-dom';
import { RestfulProvider } from 'restful-react';

import { App } from './app.component';

import { setUtmSourceCookie } from './utils';

import { Options } from './types';

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

  constructor({
    container,
    offerHandle,
    ctaLabel,
    apiUrl,
    onSuccess,
  }: Options) {
    this.container = container;
    this.offerHandle = offerHandle;
    this.ctaLabel = ctaLabel;
    this.apiUrl = apiUrl;
    this.onSuccess = onSuccess;
  }

  render() {
    setUtmSourceCookie();

    const container =
      this.container instanceof HTMLElement
        ? this.container
        : document.querySelector(this.container);

    ReactDOM.render(
      <RestfulProvider
        base={this.apiUrl}
        requestOptions={() => ({
          credentials: 'include',
          headers: { Accept: 'application/json' },
        })}
      >
        <App
          offerHandle={this.offerHandle}
          onSuccessCallback={this.onSuccess}
          apiUrl={this.apiUrl}
          ctaLabel={this.ctaLabel}
        />
      </RestfulProvider>,
      container
    );
  }
}

export default EmbeddedRegistration;
