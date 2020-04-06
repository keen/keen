import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app.component';

import { createStore } from './create-store';
import { createRootReducer } from './reducer';

import { Options } from './types';

class PricingCalculator {
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

    const reducer = createRootReducer();
    const store = createStore(reducer, []);

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  }
}

export default PricingCalculator;
