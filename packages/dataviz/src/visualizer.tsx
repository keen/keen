import React from 'react';
import ReactDOM from 'react-dom';

import { parseQuery } from '@keen.io/parser';

import { BarChartWidget } from '@keen.io/widgets';

type Options = {
  container: HTMLElement | string;
};

class Visualizer {
  private container: HTMLElement | string;

  constructor({ container }: Options) {
    this.container = container;
  }

  render({ query, result }: any) {
    const { keys, results, formatLabel } = parseQuery({ query, result } as any);

    ReactDOM.render(
      (
        <BarChartWidget
          keys={keys}
          formatLabel={formatLabel}
          labelSelector="name"
          data={results as any}
        />
      ) as any,
      this.container as any
    );
  }
}

export default Visualizer;
