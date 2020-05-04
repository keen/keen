import React from 'react';
import ReactDOM from 'react-dom';
import { RestfulProvider } from 'restful-react';

import { App } from './app.component';

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

  constructor({ container, offerHandle, ctaLabel, apiUrl }: Options) {
    this.container = container;
    this.offerHandle = offerHandle;
    this.ctaLabel = ctaLabel;
    this.apiUrl = apiUrl;
  }

  render() {
    const container =
      this.container instanceof HTMLElement
        ? this.container
        : document.querySelector(this.container);

    ReactDOM.render(
      <RestfulProvider
        base={this.apiUrl}
        requestOptions={() => ({
          headers: { Accept: 'application/json' },
        })}
      >
        <App
          offerHandle={this.offerHandle}
          apiUrl={this.apiUrl}
          ctaLabel={this.ctaLabel}
        />
      </RestfulProvider>,
      container
    );
  }
}

export default EmbeddedRegistration;
