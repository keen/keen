/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/camelcase */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';

import Visualizer from './visualizer';

import { analysisConfig } from './fixture';

export default {
  title: 'DataViz / Line Charts',
  parameters: {
    componentSubtitle: 'Line charts created with @keen.io/dataviz library',
  },
};

export const simpleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
      type: 'line',
      container: container.current,
      widget: {
        title: 'Book purchases',
        subtitle: 'hourly',
      },
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2020-02-01T00:00:00.000-00:00',
          end: '2020-02-01T16:00:00.000-00:00',
        },
        interval: 'hourly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};

export const multipleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
      type: 'line',
      container: container.current,
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2019-08-20T00:00:00.000-00:00',
          end: '2020-02-10T00:00:00.000-00:00',
        },
        group_by: ['author'],
        interval: 'monthly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};

export const multipleResultsByYear = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new Visualizer({
      type: 'line',
      container: container.current,
    });

    client
      .query({
        analysis_type: 'count',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2018-01-01T00:00:00.000-00:00',
          end: '2020-02-10T00:00:00.000-00:00',
        },
        group_by: ['author', 'name'],
        interval: 'yearly',
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '600px', height: '300px' }} ref={container} />;
};
