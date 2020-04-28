import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app.component';

import { Options } from './types';

class EmbeddedRegistration {
  /** Container used to mount widget */
  private container: HTMLElement | string;

  constructor({ container }: Options) {
    this.container = container;
  }

  render() {
    const container =
      this.container instanceof HTMLElement
        ? this.container
        : document.querySelector(this.container);

    ReactDOM.render(<App />, container);
  }
}

export default EmbeddedRegistration;
